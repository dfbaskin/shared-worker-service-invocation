import { mapRemoteService } from '@example/definitions';
import { createServiceB } from '@example/service-b';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceB = createServiceB();

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose(
    {
      exposeServiceOnPort: (serviceName: string, port: MessagePort) => {
        switch(serviceName) {
          case 'b-service':
            Comlink.expose(serviceB, port);
            break;
          default:
            throw new Error(`Service "${serviceName}" is not implemented by this worker.`);
        }
      },
      mapRemoteServiceOnPort: (serviceName: string, port: MessagePort) => {
        mapRemoteService(serviceName, Comlink.wrap(port));
      }
    },
    port
  );
};
