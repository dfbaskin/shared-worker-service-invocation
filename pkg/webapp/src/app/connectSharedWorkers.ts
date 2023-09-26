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
  const { serviceA, bindServiceB } = Comlink.wrap(
    workerOne.port
  ) as unknown as {
    serviceA: Comlink.Remote<ServiceA>;
    bindServiceB: (port: MessagePort) => Promise<void>;
  };
  workerOne.port.start();

  const workerTwo = new SharedWorker(
    new URL('./workers/sharedWorkerTwo.ts', import.meta.url)
  );
  const { serviceB, bindServiceA } = Comlink.wrap(workerTwo.port) as unknown as {
    serviceB: Comlink.Remote<ServiceB>;
    bindServiceA: (port: MessagePort) => Promise<void>;
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

  const { port1: aPort, port2: bPort } = new MessageChannel();
  await bindServiceA(Comlink.transfer(aPort, [aPort]));
  await bindServiceB(Comlink.transfer(bPort, [bPort]));
}
