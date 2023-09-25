import { createServiceB } from '@example/service-b';
import * as Comlink from 'comlink';

const ctx = globalThis as unknown as SharedWorkerGlobalScope;

const serviceB = createServiceB();

ctx.onconnect = (evt) => {
  const [port] = evt.ports;
  Comlink.expose({ serviceB }, port);
};
