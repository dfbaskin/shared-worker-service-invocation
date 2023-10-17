import { mapRemoteService } from '@example/definitions';
import * as Comlink from 'comlink';

interface SharedWorkerService {
  exposeServiceOnPort: (
    serviceName: string,
    port: MessagePort
  ) => Promise<void>;
  mapRemoteServiceOnPort: (
    serviceName: string,
    port: MessagePort
  ) => Promise<void>;
}

export async function connectToSharedWorkers() {
  const workerOne = await connectToWorkerOne();
  const workerTwo = await connectToWorkerTwo();
  const workerThree = await connectToWorkerThree();

  await mapServiceToService('a-service', workerOne, [workerTwo, workerThree]);
  await mapServiceToService('b-service', workerTwo, [workerOne, workerThree]);
  await mapServiceToService('c-service', workerThree, [workerOne, workerTwo, workerThree]);
  await mapServiceToService('d-service', workerThree, [workerOne, workerTwo, workerThree]);
}

function initializeWorker(name: string, worker: SharedWorker) {
  worker.addEventListener('error', (event) => {
    console.error(`Worker ${name} error`, event);
  });
  worker.port.start();
}

async function exposeService(
  serviceId: string,
  workerSvc: SharedWorkerService
) {
  const { port1, port2 } = new MessageChannel();
  await workerSvc.exposeServiceOnPort(
    serviceId,
    Comlink.transfer(port1, [port1])
  );
  mapRemoteService(serviceId, Comlink.wrap(port2));
}

async function mapServiceToService(
  serviceId: string,
  provider: SharedWorkerService,
  to: Iterable<SharedWorkerService>
) {
  for(const remote of to) {
    const { port1, port2 } = new MessageChannel();
    await provider.exposeServiceOnPort(
      serviceId,
      Comlink.transfer(port1, [port1])
    );
    await remote.mapRemoteServiceOnPort(
      serviceId,
      Comlink.transfer(port2, [port2])
    );
  }
}

async function connectToWorkerOne() {
  const worker = new SharedWorker(
    new URL('./workers/sharedWorkerOne.ts', import.meta.url)
  );
  initializeWorker('One', worker);
  const workerSvc = Comlink.wrap<SharedWorkerService>(worker.port);
  await exposeService('a-service', workerSvc);
  return workerSvc;
}

async function connectToWorkerTwo() {
  const worker = new SharedWorker(
    new URL('./workers/sharedWorkerTwo.ts', import.meta.url)
  );
  initializeWorker('Two', worker);
  const workerSvc = Comlink.wrap<SharedWorkerService>(worker.port);
  await exposeService('b-service', workerSvc);
  return workerSvc;
}

async function connectToWorkerThree() {
  const worker = new SharedWorker(
    new URL('./workers/sharedWorkerThree.ts', import.meta.url)
  );
  initializeWorker('Three', worker);
  const workerSvc = Comlink.wrap<SharedWorkerService>(worker.port);
  await exposeService('c-service', workerSvc);
  await exposeService('d-service', workerSvc);
  return workerSvc;
}
