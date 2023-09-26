import { ServiceA, setRemoteServiceA } from '@example/definitions';
import { createServiceB } from '@example/service-b';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceB = createServiceB();

function bindServiceA(port: MessagePort) {
  Comlink.expose(serviceB, port)
  setRemoteServiceA(Comlink.wrap<ServiceA>(port));
}

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose({ serviceB, bindServiceA }, port);
};
