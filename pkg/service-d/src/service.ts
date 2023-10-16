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

export function createServiceD(): ServiceD {
  return {
    doSomething: () => logData(createResult()),
    chainForward: async (result) => {
      return {
        ...result,
        d: createResult(),
        order: [...result.order, 'd'],
      };
    },
    chainBackward: async () => {
      return await getRemoteServiceC().then(svc => svc.chainBackward({
        d: createResult(),
        order: ['d'],
      }));
    },
    transformFromA: async () => {
      const result = await getRemoteServiceA().then(svc => svc.doSomething());
      return logData({
        fromA: result,
        message: 'Transformed by Service D',
      });
    },
    transformFromB: async () => {
      const result = await getRemoteServiceB().then(svc => svc.doSomething());
      return logData({
        fromB: result,
        message: 'Transformed by Service D',
      });
    },
    transformFromC: async () => {
      const result = await getRemoteServiceC().then(svc => svc.doSomething());
      return logData({
        fromC: result,
        message: 'Transformed by Service D',
      });
    },
  };
}
