import { ServiceC, getWorkerId } from '@example/definitions';

function createResult() {
  return {
    value: 'c',
    timestamp: new Date().toISOString(),
    workerId: getWorkerId(),
  };
}

export function createServiceC(): ServiceC {
  return {
    doSomething: () => createResult(),
  }
}
