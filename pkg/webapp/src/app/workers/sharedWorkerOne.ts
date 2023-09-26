import {
  ServiceB,
  ServiceC,
  ServiceD,
  setRemoteServiceB,
  setRemoteServiceC,
  setRemoteServiceD,
} from '@example/definitions';
import { createServiceA } from '@example/service-a';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceA = createServiceA();

function bindServiceAtoB(port: MessagePort) {
  Comlink.expose(serviceA, port);
  setRemoteServiceB(Comlink.wrap<ServiceB>(port));
}

function bindServiceAtoC(port: MessagePort) {
  Comlink.expose(serviceA, port);
  setRemoteServiceC(Comlink.wrap<ServiceC>(port));
}

function bindServiceAtoD(port: MessagePort) {
  Comlink.expose(serviceA, port);
  setRemoteServiceD(Comlink.wrap<ServiceD>(port));
}

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose(
    { serviceA, bindServiceAtoB, bindServiceAtoC, bindServiceAtoD },
    port
  );
};
