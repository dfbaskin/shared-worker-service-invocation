import { ServiceA } from '@example/definitions';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

function createResult() {
  return {
    value: 'a',
    timestamp: new Date().toISOString(),
  };
}

const service: ServiceA = {
  doSomething: () => createResult(),
};

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose(service, port);
};
