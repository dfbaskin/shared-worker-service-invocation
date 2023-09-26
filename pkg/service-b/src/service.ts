import {
  ServiceB,
  getRemoteServiceA,
  getRemoteServiceC,
  getWorkerId,
} from '@example/definitions';

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
      return await getRemoteServiceC().chainForward({
        ...result,
        b: createResult(),
        order: [...result.order, 'b'],
      });
    },
    chainBackward: async (result) => {
      return await getRemoteServiceA().chainBackward({
        ...result,
        b: createResult(),
        order: [...result.order, 'b'],
      });
    },
  };
}
