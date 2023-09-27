import {
  ServiceB,
  getRemoteServiceA,
  getRemoteServiceC,
  getRemoteServiceD,
  getWorkerId,
  logData,
} from '@example/definitions';

function createResult() {
  return {
    value: 'B-service',
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
    transformFromA: async () => {
      const result = await getRemoteServiceA().doSomething();
      return logData({
        fromA: result,
        message: 'Transformed by Service B',
      });
    },
    transformFromC: async () => {
      const result = await getRemoteServiceC().doSomething();
      return logData({
        fromC: result,
        message: 'Transformed by Service B',
      });
    },
    transformFromD: async () => {
      const result = await getRemoteServiceD().doSomething();
      return logData({
        fromD: result,
        message: 'Transformed by Service B',
      });
    },
  };
}
