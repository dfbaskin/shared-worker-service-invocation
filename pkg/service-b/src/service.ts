import {
  ServiceB,
  getWorkerId,
  logData,
  getRemoteServiceA,
  getRemoteServiceB,
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

export function createServiceB(): ServiceB {
  return {
    doSomething: () => logData(createResult()),
    chainForward: async (result) => {
      return await getRemoteServiceC().then((svc) =>
        svc.chainForward({
          ...result,
          b: createResult(),
          order: [...result.order, 'b'],
        })
      );
    },
    chainBackward: async (result) => {
      return await getRemoteServiceA().then((svc) =>
        svc.chainBackward({
          ...result,
          b: createResult(),
          order: [...result.order, 'b'],
        })
      );
    },
    transformFromA: async () => {
      const result = await getRemoteServiceB().then((svc) => svc.doSomething());
      return logData({
        fromA: result,
        message: 'Transformed by Service B',
      });
    },
    transformFromC: async () => {
      const result = await getRemoteServiceC().then((svc) => svc.doSomething());
      return logData({
        fromC: result,
        message: 'Transformed by Service B',
      });
    },
    transformFromD: async () => {
      const result = await getRemoteServiceD().then((svc) => svc.doSomething());
      return logData({
        fromD: result,
        message: 'Transformed by Service B',
      });
    },
  };
}
