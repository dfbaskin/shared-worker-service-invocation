import {
  exposeServiceOnPort,
  fromError,
  mapRemoteServiceOnPort,
} from '@example/definitions';
import { createServiceA } from '@example/service-a';
import * as Comlink from 'comlink';
import { initializeTelemetry, getTracer } from '@example/definitions';

initializeTelemetry({
  serviceName: 'shared-worker-one',
});

const span = getTracer().startSpan('Initialize');
try {
  const ctx = globalThis as unknown as SharedWorkerGlobalScope;

  const serviceA = createServiceA();

  ctx.onconnect = (evt) => {
    const [port] = evt.ports;
    Comlink.expose(
      {
        exposeServiceOnPort: exposeServiceOnPort({
          'a-service': serviceA,
        }),
        mapRemoteServiceOnPort: mapRemoteServiceOnPort(),
        workerInfo: () => ({
          title: 'Worker One',
        }),
      },
      port
    );
  };
} catch (error) {
  span.recordException(fromError(error));
}

span.end();
