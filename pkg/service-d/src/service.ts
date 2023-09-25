import { ServiceD, getWorkerId } from '@example/definitions';

function createResult() {
  return {
    value: 'd',
    timestamp: new Date().toISOString(),
    workerId: getWorkerId(),
  };
}

export function createServiceD(): ServiceD {
  return {
    doSomething: () => createResult(),
  }
}
