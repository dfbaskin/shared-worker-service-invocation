export async function connectToSharedWorkers() {
  const workerOne = new SharedWorker(
    new URL('./workers/sharedWorkerOne.ts', import.meta.url)
  );

  const workerTwo = new SharedWorker(
    new URL('./workers/sharedWorkerTwo.ts', import.meta.url)
  );

  const workerThree = new SharedWorker(
    new URL('./workers/sharedWorkerThree.ts', import.meta.url)
  );

  function addErrorHandler(name: string, worker: SharedWorker) {
    worker.addEventListener('error', (event) => {
      console.error(`Worker ${name} error`, event);
    });
  }

  addErrorHandler('One', workerOne);
  addErrorHandler('Two', workerTwo);
  addErrorHandler('Three', workerThree);
}
