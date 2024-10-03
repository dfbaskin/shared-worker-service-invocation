import {
  createProxyMetaData,
  createSpan,
  exposeServiceOnPort,
  initializeTelemetry,
  mapRemoteServiceOnPort,
} from '@example/definitions';
import { createServiceB } from '@example/service-b';
import * as Comlink from 'comlink';
import { handleSharedWorkerShutdown } from './sharedWorkerShutdown';

initializeTelemetry({
  serviceName: 'shared-worker-two',
});

const span = createSpan('initialize');

try {
  const ctx = globalThis as unknown as SharedWorkerGlobalScope;

  const { getMetaData, setMetaData } = createProxyMetaData();
  const serviceB = createServiceB(getMetaData);

  ctx.onconnect = (evt) => {
    const [port] = evt.ports;
    Comlink.expose(
      {
        exposeServiceOnPort: exposeServiceOnPort(
          {
            'b-service': serviceB,
          },
          {
            'b-service': setMetaData,
          }
        ),
        mapRemoteServiceOnPort: mapRemoteServiceOnPort(),
        workerInfo: () => ({
          title: 'Worker Two',
        }),
      },
      port
    );
  };

  handleSharedWorkerShutdown('two', ctx);
} catch (error) {
  console.error(error);
  span.setSpanError(error);
}

span.endSpan();
