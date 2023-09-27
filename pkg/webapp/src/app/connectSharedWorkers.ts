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

type BindingFn = (port: MessagePort) => Promise<void>;

export async function connectToSharedWorkers() {
  const workerOne = new SharedWorker(
    new URL('./workers/sharedWorkerOne.ts', import.meta.url)
  );
  const {
    serviceA,
    bindServiceBforWorkerOne,
    bindServiceCforWorkerOne,
    bindServiceDforWorkerOne,
  } = Comlink.wrap(workerOne.port) as unknown as {
    serviceA: Comlink.Remote<ServiceA>;
    bindServiceBforWorkerOne: BindingFn;
    bindServiceCforWorkerOne: BindingFn;
    bindServiceDforWorkerOne: BindingFn;
  };
  workerOne.port.start();

  const workerTwo = new SharedWorker(
    new URL('./workers/sharedWorkerTwo.ts', import.meta.url)
  );
  const {
    serviceB,
    bindServiceAforWorkerTwo,
    bindServiceCforWorkerTwo,
    bindServiceDforWorkerTwo,
  } = Comlink.wrap(workerTwo.port) as unknown as {
    serviceB: Comlink.Remote<ServiceB>;
    bindServiceAforWorkerTwo: BindingFn;
    bindServiceCforWorkerTwo: BindingFn;
    bindServiceDforWorkerTwo: BindingFn;
  };
  workerTwo.port.start();

  const workerThree = new SharedWorker(
    new URL('./workers/sharedWorkerThree.ts', import.meta.url)
  );
  const {
    serviceC,
    serviceD,
    bindServiceAforWorkerThree,
    bindServiceBforWorkerThree,
  } = Comlink.wrap(workerThree.port) as unknown as {
    serviceC: Comlink.Remote<ServiceC>;
    serviceD: Comlink.Remote<ServiceD>;
    bindServiceAforWorkerThree: BindingFn;
    bindServiceBforWorkerThree: BindingFn;
  };
  workerThree.port.start();

  setRemoteServiceA(serviceA);
  setRemoteServiceB(serviceB);
  setRemoteServiceC(serviceC);
  setRemoteServiceD(serviceD);

  const permutations = [
    async (mc) => {
      await bindServiceBforWorkerOne(Comlink.transfer(mc.port1, [mc.port1]));
      await bindServiceAforWorkerTwo(Comlink.transfer(mc.port2, [mc.port2]));
    },
    // async (mc) => {
    //   await bindServiceAforWorkerTwo(Comlink.transfer(mc.port1, [mc.port1]));
    //   await bindServiceBforWorkerOne(Comlink.transfer(mc.port2, [mc.port2]));
    // },
    async (mc) => {
      await bindServiceCforWorkerOne(Comlink.transfer(mc.port1, [mc.port1]));
      await bindServiceAforWorkerThree(Comlink.transfer(mc.port2, [mc.port2]));
    },
    async (mc) => {
      await bindServiceBforWorkerThree(Comlink.transfer(mc.port1, [mc.port1]));
      await bindServiceDforWorkerTwo(Comlink.transfer(mc.port2, [mc.port2]));
    },
  ] as ((mc: MessageChannel) => Promise<void>)[];
  for (const fn of permutations) {
    fn(new MessageChannel());
  }
}
