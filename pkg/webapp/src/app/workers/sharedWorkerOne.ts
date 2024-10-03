import {
  createProxyMetaData,
  createSpan,
  exposeServiceOnPort,
  initializeTelemetry,
  mapRemoteServiceOnPort,
} from '@example/definitions';
import { createServiceA } from '@example/service-a';
import * as Comlink from 'comlink';
import { handleSharedWorkerShutdown } from './sharedWorkerShutdown';

initializeTelemetry({
  serviceName: 'shared-worker-one',
});

const span = createSpan('initialize');

try {
  const ctx = globalThis as unknown as SharedWorkerGlobalScope;

  const { getMetaData, setMetaData } = createProxyMetaData();
  const serviceA = createServiceA(getMetaData);

  ctx.onconnect = (evt) => {
    const [port] = evt.ports;
    Comlink.expose(
      {
        exposeServiceOnPort: exposeServiceOnPort(
          {
            'a-service': serviceA,
          },
          {
            'a-service': setMetaData,
          }
        ),
        mapRemoteServiceOnPort: mapRemoteServiceOnPort(),
        workerInfo: () => ({
          title: 'Worker One',
        }),
      },
      port
    );
  };

  handleSharedWorkerShutdown('one', ctx);
} catch (error) {
  console.error(error);
  span.setSpanError(error);
}

span.endSpan();
