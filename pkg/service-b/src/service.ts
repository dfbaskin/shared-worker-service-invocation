import { ServiceB, getWorkerId } from '@example/definitions';

function createResult() {
  return {
    value: 'b',
    timestamp: new Date().toISOString(),
    workerId: getWorkerId(),
  };
}

export function createServiceB(): ServiceB {
  return {
    doSomething: () => createResult(),
    chainForward: async (result) => {
      return {
        ...result,
        b: createResult(),
        order: [...result.order, 'b'],
      };
    },
  };
}
