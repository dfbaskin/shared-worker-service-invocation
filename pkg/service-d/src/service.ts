import {
  ServiceD,
  getWorkerId,
  logData,
  getRemoteServiceA,
  getRemoteServiceB,
  getRemoteServiceC,
} from '@example/definitions';

function createResult() {
  return {
    value: 'D-service',
    timestamp: new Date().toISOString(),
    workerId: getWorkerId(),
  };
}

export function createServiceD(getMetaData: () => unknown): ServiceD {
  return {
    doSomething: () => {
      const metadata = getMetaData();
      return logData({
        ...createResult(),
        metadata,
      });
    },
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
    transformFromA: async () => {
      const result = await getRemoteServiceA().doSomething();
      return logData({
        fromA: result,
        message: 'Transformed by Service D',
      });
    },
    transformFromB: async () => {
      const result = await getRemoteServiceB().doSomething();
      return logData({
        fromB: result,
        message: 'Transformed by Service D',
      });
    },
    transformFromC: async () => {
      const result = await getRemoteServiceC().doSomething();
      return logData({
        fromC: result,
        message: 'Transformed by Service D',
      });
    },
  };
}
