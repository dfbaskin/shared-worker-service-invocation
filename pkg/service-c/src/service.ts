import {
  ServiceC,
  getWorkerId,
  logData,
  getRemoteServiceA,
  getRemoteServiceB,
  getRemoteServiceD,
} from '@example/definitions';

function createResult() {
  return {
    value: 'C-service',
    timestamp: new Date().toISOString(),
    workerId: getWorkerId(),
  };
}

export function createServiceC(): ServiceC {
  return {
    doSomething: () => logData(createResult()),
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
    transformFromA: async () => {
      const result = await getRemoteServiceA().doSomething();
      return logData({
        fromA: result,
        message: 'Transformed by Service C',
      });
    },
    transformFromB: async () => {
      const result = await getRemoteServiceB().doSomething();
      return logData({
        fromB: result,
        message: 'Transformed by Service C',
      });
    },
    transformFromD: async () => {
      const result = await getRemoteServiceD().doSomething();
      return logData({
        fromD: result,
        message: 'Transformed by Service C',
      });
    },
  };
}
