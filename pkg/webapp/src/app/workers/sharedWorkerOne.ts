import { mapRemoteService } from '@example/definitions';
import { createServiceA } from '@example/service-a';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceA = createServiceA();

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose(
    {
      exposeServiceOnPort: (serviceId: string, port: MessagePort) => {
        switch(serviceId) {
          case 'a-service':
            Comlink.expose(serviceA, port);
            break;
          default:
            throw new Error(`Service "${serviceId}" is not implemented by this worker.`);
        }
      },
      mapRemoteServiceOnPort: (serviceId: string, port: MessagePort) => {
        mapRemoteService(serviceId, Comlink.wrap(port));
      }
    },
    port
  );
};
