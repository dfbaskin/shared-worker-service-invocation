import { mapRemoteService } from '@example/definitions';
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
      exposeServiceOnPort: (serviceName: string, port: MessagePort) => {
        switch(serviceName) {
          case 'c-service':
            Comlink.expose(serviceC, port);
            break;
          case 'd-service':
            Comlink.expose(serviceD, port);
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
