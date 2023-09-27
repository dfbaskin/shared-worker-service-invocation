import {
  ServiceB,
  ServiceC,
  ServiceD,
} from '@example/definitions';
import { createServiceA, bindingsServiceA } from '@example/service-a';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceA = createServiceA();

function bindServiceBforWorkerOne(port: MessagePort) {
  Comlink.expose(serviceA, port);
  bindingsServiceA.setRemoteServiceB(Comlink.wrap<ServiceB>(port));
}

function bindServiceCforWorkerOne(port: MessagePort) {
  Comlink.expose(serviceA, port);
  bindingsServiceA.setRemoteServiceC(Comlink.wrap<ServiceC>(port));
}

function bindServiceDforWorkerOne(port: MessagePort) {
  Comlink.expose(serviceA, port);
  bindingsServiceA.setRemoteServiceD(Comlink.wrap<ServiceD>(port));
}

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose(
    { serviceA, bindServiceBforWorkerOne, bindServiceCforWorkerOne, bindServiceDforWorkerOne },
    port
  );
};
