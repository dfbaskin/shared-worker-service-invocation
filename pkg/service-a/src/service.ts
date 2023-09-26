import { ServiceA, getRemoteServiceB, getWorkerId } from '@example/definitions';

function createResult() {
  return {
    value: 'a',
    timestamp: new Date().toISOString(),
    workerId: getWorkerId(),
  };
}

export function createServiceA(): ServiceA {
  return {
    doSomething: () => createResult(),
    chainForward: async () => {
      return await getRemoteServiceB().chainForward({
        a: createResult(),
        order: ['a'],
      });
    },
  };
}
