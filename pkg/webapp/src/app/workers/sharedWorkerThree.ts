import {
  ServiceA,
  ServiceB,
  ServiceC,
  ServiceD,
  setServiceBindings,
} from '@example/definitions';
import { createServiceC, bindingsServiceC } from '@example/service-c';
import { createServiceD, bindingsServiceD } from '@example/service-d';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceC = createServiceC();
const serviceD = createServiceD();

setServiceBindings([[bindLocalServiceCtoD, bindLocalServiceDtoC]]);

function bindServiceAforWorkerThreeServiceC(port: MessagePort) {
  Comlink.expose(serviceC, port);
  bindingsServiceC.setRemoteServiceA(Comlink.wrap<ServiceA>(port));
}

function bindServiceBforWorkerThreeServiceC(port: MessagePort) {
  Comlink.expose(serviceC, port);
  bindingsServiceC.setRemoteServiceB(Comlink.wrap<ServiceB>(port));
}

function bindServiceAforWorkerThreeServiceD(port: MessagePort) {
  Comlink.expose(serviceD, port);
  bindingsServiceD.setRemoteServiceA(Comlink.wrap<ServiceA>(port));
}

function bindServiceBforWorkerThreeServiceD(port: MessagePort) {
  Comlink.expose(serviceD, port);
  bindingsServiceD.setRemoteServiceB(Comlink.wrap<ServiceB>(port));
}

function bindLocalServiceCtoD(port: MessagePort) {
  Comlink.expose(serviceC, port);
  bindingsServiceC.setRemoteServiceD(Comlink.wrap<ServiceD>(port));
  return Promise.resolve();
}

function bindLocalServiceDtoC(port: MessagePort) {
  Comlink.expose(serviceD, port);
  bindingsServiceD.setRemoteServiceC(Comlink.wrap<ServiceC>(port));
  return Promise.resolve();
}

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose(
    {
      serviceC,
      serviceD,
      bindServiceAforWorkerThreeServiceC,
      bindServiceBforWorkerThreeServiceC,
      bindServiceAforWorkerThreeServiceD,
      bindServiceBforWorkerThreeServiceD,
    },
    port
  );
};
