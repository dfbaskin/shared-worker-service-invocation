import {
  setRemoteServiceA,
  ServiceA,
  setRemoteServiceB,
  ServiceB,
  setRemoteServiceC,
  ServiceC,
  setRemoteServiceD,
  ServiceD,
} from '@example/definitions';
import { createServiceC } from '@example/service-c';
import { createServiceD } from '@example/service-d';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceC = createServiceC();
const serviceD = createServiceD();

function bindServiceCtoA(port: MessagePort) {
  Comlink.expose(serviceC, port);
  setRemoteServiceA(Comlink.wrap<ServiceA>(port));
}

function bindServiceCtoB(port: MessagePort) {
  Comlink.expose(serviceC, port);
  setRemoteServiceB(Comlink.wrap<ServiceB>(port));
}

function bindServiceCtoD(port: MessagePort) {
  Comlink.expose(serviceC, port);
  setRemoteServiceD(Comlink.wrap<ServiceD>(port));
}

function bindServiceDtoA(port: MessagePort) {
  Comlink.expose(serviceD, port);
  setRemoteServiceA(Comlink.wrap<ServiceA>(port));
}

function bindServiceDtoB(port: MessagePort) {
  Comlink.expose(serviceD, port);
  setRemoteServiceB(Comlink.wrap<ServiceB>(port));
}

function bindServiceDtoC(port: MessagePort) {
  Comlink.expose(serviceD, port);
  setRemoteServiceC(Comlink.wrap<ServiceC>(port));
}

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose(
    {
      serviceC,
      serviceD,
      bindServiceCtoA,
      bindServiceCtoB,
      bindServiceCtoD,
      bindServiceDtoA,
      bindServiceDtoB,
      bindServiceDtoC,
    },
    port
  );
};
