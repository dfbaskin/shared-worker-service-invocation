import {
  ServiceB,
  getWorkerId,
  logData,
  getRemoteServiceA,
  getRemoteServiceC,
  getRemoteServiceD,
} from '@example/definitions';

function createResult() {
  return {
    value: 'B-service',
    timestamp: new Date().toISOString(),
    workerId: getWorkerId(),
  };
}

export function createServiceB(getMetaData: () => unknown): ServiceB {
  return {
    doSomething: () => {
      const metadata = getMetaData();
      return logData({
        ...createResult(),
        metadata,
      });
    },
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
