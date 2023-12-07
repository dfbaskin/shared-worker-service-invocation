import {
  createProxyMetaData,
  exposeServiceOnPort,
  mapRemoteServiceOnPort,
} from '@example/definitions';
import { createServiceB } from '@example/service-b';
import * as Comlink from 'comlink';

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
} catch (error) {
  console.error(error);
}
