import { ServiceA, ServiceB, ServiceC, ServiceD } from '@example/definitions';
import * as Comlink from 'comlink';

let services:
  | {
      serviceA: Comlink.Remote<ServiceA>;
      serviceB: Comlink.Remote<ServiceB>;
      serviceC: Comlink.Remote<ServiceC>;
      serviceD: Comlink.Remote<ServiceD>;
    }
  | undefined;

export function getWorkerApi() {
  if (!services) {
    throw new Error('Services not initialized');
  }
  return services;
}

export async function connectToSharedWorkers() {
  const workerOne = new SharedWorker(
    new URL('./workers/sharedWorkerOne.ts', import.meta.url)
  );
  const { serviceA } = Comlink.wrap(workerOne.port) as unknown as {
    serviceA: Comlink.Remote<ServiceA>;
  };
  workerOne.port.start();

  const workerTwo = new SharedWorker(
    new URL('./workers/sharedWorkerTwo.ts', import.meta.url)
  );
  const { serviceB } = Comlink.wrap(workerTwo.port) as unknown as {
    serviceB: Comlink.Remote<ServiceB>;
  };
  workerTwo.port.start();

  const workerThree = new SharedWorker(
    new URL('./workers/sharedWorkerThree.ts', import.meta.url)
  );
  const { serviceC, serviceD } = Comlink.wrap(workerThree.port) as unknown as {
    serviceC: Comlink.Remote<ServiceC>;
    serviceD: Comlink.Remote<ServiceD>;
  };
  workerThree.port.start();

  services = {
    serviceA,
    serviceB,
    serviceC,
    serviceD,
  };
}
