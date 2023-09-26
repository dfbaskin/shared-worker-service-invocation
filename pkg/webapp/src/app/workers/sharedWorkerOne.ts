import { ServiceB, setRemoteServiceB } from '@example/definitions';
import { createServiceA } from '@example/service-a';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceA = createServiceA();

function bindServiceB(port: MessagePort) {
  Comlink.expose(serviceA, port)
  setRemoteServiceB(Comlink.wrap<ServiceB>(port));
}

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose({ serviceA, bindServiceB }, port);
};
