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

function bindServiceAforWorkerThree(port: MessagePort) {
  Comlink.expose(serviceC, port);
  setRemoteServiceA(Comlink.wrap<ServiceA>(port));
}

function bindServiceBforWorkerThree(port: MessagePort) {
  Comlink.expose(serviceC, port);
  setRemoteServiceB(Comlink.wrap<ServiceB>(port));
}

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose(
    {
      serviceC,
      serviceD,
      bindServiceAforWorkerThree,
      bindServiceBforWorkerThree,
    },
    port
  );
};
