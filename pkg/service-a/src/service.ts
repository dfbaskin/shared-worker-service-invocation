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
    doSomething: () => logData(createResult()),
    chainForward: async () => {
      return await getRemoteServiceB().then((svc) =>
        svc.chainForward({
          a: createResult(),
          order: ['a'],
        })
      );
    },
    chainBackward: async (result) => {
      return {
        ...result,
        a: createResult(),
        order: [...result.order, 'a'],
      };
    },
    transformFromB: async () => {
      const result = await getRemoteServiceB().then((svc) => svc.doSomething());
      return logData({
        fromB: result,
        message: 'Transformed by Service A',
      });
    },
    transformFromC: async () => {
      const result = await getRemoteServiceC().then((svc) => svc.doSomething());
      return logData({
        fromC: result,
        message: 'Transformed by Service A',
      });
    },
    transformFromD: async () => {
      const result = await getRemoteServiceD().then((svc) => svc.doSomething());
      return logData({
        fromD: result,
        message: 'Transformed by Service A',
      });
    },
  };
}
