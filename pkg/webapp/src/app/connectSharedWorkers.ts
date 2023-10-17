import { mapRemoteService } from '@example/definitions';
import * as Comlink from 'comlink';

interface SharedWorkerService {
  exposeServiceOnPort: (
    serviceName: string,
    port: MessagePort
  ) => Promise<void>;
}

export async function connectToSharedWorkers() {
  await connectToWorkerOne();
  await connectToWorkerTwo();
  await connectToWorkerThree();
}

function initializeWorker(name: string, worker: SharedWorker) {
  worker.addEventListener('error', (event) => {
    console.error(`Worker ${name} error`, event);
  });
  worker.port.start();
}

async function connectToWorkerOne() {
  const worker = new SharedWorker(
    new URL('./workers/sharedWorkerOne.ts', import.meta.url)
  );
  initializeWorker('One', worker);

  const { exposeServiceOnPort } = Comlink.wrap<SharedWorkerService>(
    worker.port
  );

  const { port1, port2 } = new MessageChannel();
  await exposeServiceOnPort('a-service', Comlink.transfer(port1, [port1]));
  mapRemoteService('a-service', Comlink.wrap(port2));
}

async function connectToWorkerTwo() {
  const worker = new SharedWorker(
    new URL('./workers/sharedWorkerTwo.ts', import.meta.url)
  );
  initializeWorker('Two', worker);

  const { exposeServiceOnPort } = Comlink.wrap<SharedWorkerService>(
    worker.port
  );

  const { port1, port2 } = new MessageChannel();
  await exposeServiceOnPort('b-service', Comlink.transfer(port1, [port1]));
  mapRemoteService('b-service', Comlink.wrap(port2));
}

async function connectToWorkerThree() {
  const worker = new SharedWorker(
    new URL('./workers/sharedWorkerThree.ts', import.meta.url)
  );
  initializeWorker('Three', worker);

  const { exposeServiceOnPort } = Comlink.wrap<SharedWorkerService>(
    worker.port
  );

  {
    const { port1, port2 } = new MessageChannel();
    await exposeServiceOnPort('c-service', Comlink.transfer(port1, [port1]));
    mapRemoteService('c-service', Comlink.wrap(port2));
  }

  {
    const { port1, port2 } = new MessageChannel();
    await exposeServiceOnPort('d-service', Comlink.transfer(port1, [port1]));
    mapRemoteService('d-service', Comlink.wrap(port2));
  }
}
