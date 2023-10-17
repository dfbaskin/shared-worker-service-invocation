import { exposeServiceOnPort, mapRemoteServiceOnPort } from '@example/definitions';
import { createServiceB } from '@example/service-b';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceB = createServiceB();

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose(
    {
      exposeServiceOnPort: exposeServiceOnPort({
        'b-service': serviceB,
      }),
      mapRemoteServiceOnPort: mapRemoteServiceOnPort(),
      workerInfo: () => ({
        title: "Worker Two"
      })
    },
    port
  );
};
