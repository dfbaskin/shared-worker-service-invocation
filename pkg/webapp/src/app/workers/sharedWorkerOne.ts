import { mapRemoteService } from '@example/definitions';
import { createServiceA } from '@example/service-a';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceA = createServiceA();

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose(
    {
      exposeServiceOnPort: (serviceName: string, port: MessagePort) => {
        switch(serviceName) {
          case 'a-service':
            Comlink.expose(serviceA, port);
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
