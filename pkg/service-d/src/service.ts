import { ServiceD, getRemoteServiceC, getWorkerId } from '@example/definitions';

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
    chainForward: async (result) => {
      return {
        ...result,
        d: createResult(),
        order: [...result.order, 'd'],
      };
    },
    chainBackward: async () => {
      return await getRemoteServiceC().chainBackward({
        d: createResult(),
        order: ['d'],
      });
    },
  }
}
