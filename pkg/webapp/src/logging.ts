import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';

const provider = new WebTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.addSpanProcessor(new SimpleSpanProcessor(new ZipkinExporter({})));

provider.register();

const tracer = provider.getTracer('shared-worker-service-invocation');

export { tracer };
