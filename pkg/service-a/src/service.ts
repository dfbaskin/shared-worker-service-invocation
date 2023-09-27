import {
  ServiceA,
  getRemoteServiceB,
  getRemoteServiceC,
  getRemoteServiceD,
  getWorkerId,
  logData,
} from '@example/definitions';

function createResult() {
  return {
    value: 'A-service',
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
    chainBackward: async (result) => {
      return {
        ...result,
        a: createResult(),
        order: [...result.order, 'a'],
      };
    },
    transformFromB: async () => {
      const result = await getRemoteServiceB().doSomething();
      return logData({
        fromB: result,
        message: 'Transformed by Service A',
      });
    },
    transformFromC: async () => {
      const result = await getRemoteServiceC().doSomething();
      return logData({
        fromC: result,
        message: 'Transformed by Service A',
      });
    },
    transformFromD: async () => {
      const result = await getRemoteServiceD().doSomething();
      return logData({
        fromD: result,
        message: 'Transformed by Service A',
      });
    },
  };
}
