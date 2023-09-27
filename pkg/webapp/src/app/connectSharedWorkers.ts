import {
  ServiceA,
  ServiceB,
  ServiceC,
  ServiceD,
  setRemoteServiceA,
  setRemoteServiceB,
  setRemoteServiceC,
  setRemoteServiceD,
} from '@example/definitions';
import * as Comlink from 'comlink';

export async function connectToSharedWorkers() {
  const workerOne = new SharedWorker(
    new URL('./workers/sharedWorkerOne.ts', import.meta.url)
  );
  const { serviceA, bindServiceAtoB } = Comlink.wrap(
    workerOne.port
  ) as unknown as {
    serviceA: Comlink.Remote<ServiceA>;
    bindServiceAtoB: (port: MessagePort) => Promise<void>;
    bindServiceAtoC: (port: MessagePort) => Promise<void>;
    bindServiceAtoD: (port: MessagePort) => Promise<void>;
  };
  workerOne.port.start();

  const workerTwo = new SharedWorker(
    new URL('./workers/sharedWorkerTwo.ts', import.meta.url)
  );
  const { serviceB, bindServiceBtoA, bindServiceBtoC } = Comlink.wrap(
    workerTwo.port
  ) as unknown as {
    serviceB: Comlink.Remote<ServiceB>;
    bindServiceBtoA: (port: MessagePort) => Promise<void>;
    bindServiceBtoC: (port: MessagePort) => Promise<void>;
    bindServiceBtoD: (port: MessagePort) => Promise<void>;
  };
  workerTwo.port.start();

  const workerThree = new SharedWorker(
    new URL('./workers/sharedWorkerThree.ts', import.meta.url)
  );
  const {
    serviceC,
    serviceD,
    bindServiceCtoB,
    bindServiceCtoD,
    bindServiceDtoC,
  } = Comlink.wrap(workerThree.port) as unknown as {
    serviceC: Comlink.Remote<ServiceC>;
    serviceD: Comlink.Remote<ServiceD>;
    bindServiceCtoA: (port: MessagePort) => Promise<void>;
    bindServiceCtoB: (port: MessagePort) => Promise<void>;
    bindServiceCtoD: (port: MessagePort) => Promise<void>;
    bindServiceDtoA: (port: MessagePort) => Promise<void>;
    bindServiceDtoB: (port: MessagePort) => Promise<void>;
    bindServiceDtoC: (port: MessagePort) => Promise<void>;
  };
  workerThree.port.start();

  setRemoteServiceA(serviceA);
  setRemoteServiceB(serviceB);
  setRemoteServiceC(serviceC);
  setRemoteServiceD(serviceD);

  const permutations = [
    async (mc) => {
      await bindServiceAtoB(Comlink.transfer(mc.port1, [mc.port1]));
      await bindServiceBtoA(Comlink.transfer(mc.port2, [mc.port2]));
    },
    async (mc) => {
      await bindServiceBtoC(Comlink.transfer(mc.port1, [mc.port1]));
      await bindServiceCtoB(Comlink.transfer(mc.port2, [mc.port2]));
    },
    async (mc) => {
      await bindServiceCtoD(Comlink.transfer(mc.port1, [mc.port1]));
      await bindServiceDtoC(Comlink.transfer(mc.port2, [mc.port2]));
    },
  ] as ((mc: MessageChannel) => Promise<void>)[];
  for (const fn of permutations) {
    fn(new MessageChannel());
  }
}