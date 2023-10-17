import {
  wrapSharedWorkerService,
  exposeService,
  mapServiceToService,
} from '@example/definitions';

export async function connectToSharedWorkers() {
  const workerOne = connectToWorkerOne();
  const workerTwo = connectToWorkerTwo();
  const workerThree = connectToWorkerThree();

  await exposeService('a-service', workerOne);
  await exposeService('b-service', workerTwo);
  await exposeService('c-service', workerThree);
  await exposeService('d-service', workerThree);

  await mapServiceToService('a-service', workerOne, [workerTwo, workerThree]);
  await mapServiceToService('b-service', workerTwo, [workerOne, workerThree]);
  await mapServiceToService('c-service', workerThree, [
    workerOne,
    workerTwo,
    workerThree,
  ]);
  await mapServiceToService('d-service', workerThree, [
    workerOne,
    workerTwo,
    workerThree,
  ]);
}

function initializeWorker(name: string, worker: SharedWorker) {
  worker.addEventListener('error', (event) => {
    console.error(`Worker ${name} error`, event);
  });
  worker.port.start();
}

function connectToWorkerOne() {
  const worker = new SharedWorker(
    new URL('./workers/sharedWorkerOne.ts', import.meta.url)
  );
  initializeWorker('One', worker);
  return wrapSharedWorkerService(worker.port);
}

function connectToWorkerTwo() {
  const worker = new SharedWorker(
    new URL('./workers/sharedWorkerTwo.ts', import.meta.url)
  );
  initializeWorker('Two', worker);
  return wrapSharedWorkerService(worker.port);
}

function connectToWorkerThree() {
  const worker = new SharedWorker(
    new URL('./workers/sharedWorkerThree.ts', import.meta.url)
  );
  initializeWorker('Three', worker);
  return wrapSharedWorkerService(worker.port);
}
