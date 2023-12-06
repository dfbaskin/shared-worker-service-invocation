import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

let provider: WebTracerProvider | undefined;

export function initializeTelemetry(options: { serviceName: string }) {
  const { serviceName } = options;
  provider = new WebTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  provider.addSpanProcessor(new SimpleSpanProcessor(new ZipkinExporter()));
  provider.register();
}

export function getTracer() {
  if (!provider) {
    throw new Error('Telemetry not initialized');
  }
  return provider.getTracer('shared-worker-service-invocation');
}

export function fromError(err: unknown) {
  return err instanceof Error ? err : new Error(String(err));
}
