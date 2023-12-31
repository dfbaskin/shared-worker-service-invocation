import {
  BatchSpanProcessor,
  WebTracerProvider,
  StackContextManager,
} from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { Resource } from '@opentelemetry/resources';
import {
  context,
  propagation,
  trace,
  Span,
  SpanStatusCode,
  Attributes,
} from '@opentelemetry/api';

let provider: WebTracerProvider | undefined;

export function initializeTelemetry(options: { serviceName: string }) {
  const { serviceName } = options;
  provider = new WebTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });

  provider.addSpanProcessor(
    new BatchSpanProcessor(new OTLPTraceExporter(), {
      // The maximum queue size. After the size is reached spans are dropped.
      maxQueueSize: 100,
      // The maximum batch size of every export. It must be smaller or equal to maxQueueSize.
      maxExportBatchSize: 10,
      // The interval between two consecutive exports
      scheduledDelayMillis: 500,
      // How long the export can run before it is cancelled
      exportTimeoutMillis: 30000,
    })
  );

  provider.register({
    contextManager: new StackContextManager(),
  });
}

export function createSpan(
  name: string,
  options?: {
    parentSpan?: WrappedSpan;
    spanMetaData?: unknown;
  }
) {
  if (!provider) {
    throw new Error('Telemetry not initialized');
  }

  const tracer = provider.getTracer('shared-worker-service-invocation');

  const { spanMetaData, parentSpan } = options || {};
  if (parentSpan) {
    const activeContext = parentSpan.setAsCurrentSpan();
    const span = tracer.startSpan(name, undefined, activeContext);
    return wrapSpan(span);
  } else if (isSpanMetaData(spanMetaData)) {
    const activeContext = propagation.extract(context.active(), spanMetaData);
    const span = tracer.startSpan(name, undefined, activeContext);
    trace.setSpan(activeContext, span);
    return wrapSpan(span);
  } else {
    const span = tracer.startSpan(name);
    return wrapSpan(span);
  }
}

export function getCurrentSpan() {
  const span = trace.getSpan(context.active());
  if (!span) {
    throw new Error('No active span');
  }
  return wrapSpan(span);
}

export type WrappedSpan = ReturnType<typeof wrapSpan>;

function wrapSpan(span: Span) {
  const endSpan = () => {
    span.end();
  };

  const setAsCurrentSpan = () => {
    return trace.setSpan(context.active(), span);
  };

  const withSpan = <T>(fn: () => T) => {
    return context.with(trace.setSpan(context.active(), span), () => fn());
  };

  const setSpanSuccess = (message?: string) => {
    span.setStatus({
      code: SpanStatusCode.OK,
      message,
    });
  };

  const setSpanError = (error: unknown) => {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: String(error),
    });
  };

  const addSpanEvent = (name: string, attributes?: Attributes) => {
    span.addEvent(name, attributes);
  };

  const getSpanMetaData = () => {
    const output: {
      traceparent?: string;
      tracestate?: string;
    } = {};
    propagation.inject(context.active(), output);
    const { traceparent, tracestate } = output;
    return { traceparent, tracestate };
  };

  return {
    endSpan,
    withSpan,
    addSpanEvent,
    setSpanSuccess,
    setSpanError,
    getSpanMetaData,
    setAsCurrentSpan,
  };
}

function isSpanMetaData(
  data: unknown
): data is { traceparent: string; tracestate?: string } {
  return typeof data === 'object' && data !== null && 'traceparent' in data;
}
