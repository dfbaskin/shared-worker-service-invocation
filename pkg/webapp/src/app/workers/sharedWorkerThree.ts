import { exposeServiceOnPort, mapRemoteServiceOnPort } from '@example/definitions';
import { createServiceC } from '@example/service-c';
import { createServiceD } from '@example/service-d';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceC = createServiceC();
const serviceD = createServiceD();

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose(
    {
      exposeServiceOnPort: exposeServiceOnPort({
        'c-service': serviceC,
        'd-service': serviceD,
      }),
      mapRemoteServiceOnPort: mapRemoteServiceOnPort(),
      workerInfo: () => ({
        title: "Worker Three"
      })
    },
    port
  );
};
