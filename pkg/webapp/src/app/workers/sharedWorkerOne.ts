import { createServiceA } from '@example/service-a';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceA = createServiceA();

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose({ serviceA }, port);
};
