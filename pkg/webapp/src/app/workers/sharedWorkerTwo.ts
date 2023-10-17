import { mapRemoteService } from '@example/definitions';
import { createServiceB } from '@example/service-b';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceB = createServiceB();

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose(
    {
      exposeServiceOnPort: (serviceId: string, port: MessagePort) => {
        switch(serviceId) {
          case 'b-service':
            Comlink.expose(serviceB, port);
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
