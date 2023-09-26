import { ServiceC, getRemoteServiceB, getRemoteServiceD, getWorkerId } from '@example/definitions';

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
    chainForward: async (result) => {
      return await getRemoteServiceD().chainForward({
        ...result,
        c: createResult(),
        order: [...result.order, 'c'],
      });
    },
    chainBackward: async (result) => {
      return await getRemoteServiceB().chainBackward({
        ...result,
        c: createResult(),
        order: [...result.order, 'c'],
      });
    },
  }
}
