import { createServiceC } from '@example/service-c';
import { createServiceD } from '@example/service-d';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceC = createServiceC();
const serviceD = createServiceD();

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose({ serviceC, serviceD }, port);
};
