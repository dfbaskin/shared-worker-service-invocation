import { ServiceA } from '@example/definitions';
import * as Comlink from 'comlink';

let serviceA: Comlink.Remote<ServiceA> | undefined;

export function getWorkerApi() {
  if (!serviceA) {
    throw new Error('ServiceA not initialized');
  }
  return {
    serviceA,
  };
}

export async function connectToSharedWorkers() {
  const workerOne = new SharedWorker(
    new URL('./workers/sharedWorkerOne.ts', import.meta.url)
  );
  serviceA = Comlink.wrap<ServiceA>(workerOne.port);
  workerOne.port.start();
}
