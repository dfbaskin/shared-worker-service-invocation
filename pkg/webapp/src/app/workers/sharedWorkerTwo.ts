import {
  ServiceA,
  ServiceC,
  ServiceD,
  setRemoteServiceA,
  setRemoteServiceC,
  setRemoteServiceD,
} from '@example/definitions';
import { createServiceB } from '@example/service-b';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceB = createServiceB();

function bindServiceAforWorkerTwo(port: MessagePort) {
  Comlink.expose(serviceB, port);
  setRemoteServiceA(Comlink.wrap<ServiceA>(port));
}

function bindServiceCforWorkerTwo(port: MessagePort) {
  Comlink.expose(serviceB, port);
  setRemoteServiceC(Comlink.wrap<ServiceC>(port));
}

function bindServiceDforWorkerTwo(port: MessagePort) {
  Comlink.expose(serviceB, port);
  setRemoteServiceD(Comlink.wrap<ServiceD>(port));
}

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose(
    { serviceB, bindServiceAforWorkerTwo, bindServiceCforWorkerTwo, bindServiceDforWorkerTwo },
    port
  );
};
