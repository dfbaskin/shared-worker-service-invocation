import { exposeServiceOnPort, mapRemoteServiceOnPort } from '@example/definitions';
import { createServiceA } from '@example/service-a';
import * as Comlink from 'comlink';

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
    },
    port
  );
};
