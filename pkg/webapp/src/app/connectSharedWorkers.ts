import {
  ServiceA,
  ServiceB,
  ServiceC,
  ServiceD,
  setRemoteServiceA,
  setRemoteServiceB,
  setRemoteServiceC,
  setRemoteServiceD,
  setServiceBindings,
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
    bindServiceAforWorkerThreeServiceC,
    bindServiceBforWorkerThreeServiceC,
    bindServiceAforWorkerThreeServiceD,
    bindServiceBforWorkerThreeServiceD,
  } = Comlink.wrap(workerThree.port) as unknown as {
    serviceC: Comlink.Remote<ServiceC>;
    serviceD: Comlink.Remote<ServiceD>;
    bindServiceAforWorkerThreeServiceC: BindingFn;
    bindServiceBforWorkerThreeServiceC: BindingFn;
    bindServiceAforWorkerThreeServiceD: BindingFn;
    bindServiceBforWorkerThreeServiceD: BindingFn;
  };
  workerThree.port.start();

  setRemoteServiceA(serviceA);
  setRemoteServiceB(serviceB);
  setRemoteServiceC(serviceC);
  setRemoteServiceD(serviceD);

  await setServiceBindings([
    [bindServiceBforWorkerOne, bindServiceAforWorkerTwo],
    [bindServiceDforWorkerOne, bindServiceAforWorkerThreeServiceD],
    [bindServiceCforWorkerOne, bindServiceAforWorkerThreeServiceC],
    [bindServiceDforWorkerTwo, bindServiceBforWorkerThreeServiceD],
    [bindServiceCforWorkerTwo, bindServiceBforWorkerThreeServiceC],
  ]);
}
