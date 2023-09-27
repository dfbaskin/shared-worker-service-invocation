import {
  ServiceA,
  getWorkerId,
  logData,
  servicesBindings,
} from '@example/definitions';

function createResult() {
  return {
    value: 'A-service',
    timestamp: new Date().toISOString(),
    workerId: getWorkerId(),
  };
}

export const bindingsServiceA = servicesBindings();

export function createServiceA(): ServiceA {
  return {
    doSomething: () => logData(createResult()),
    chainForward: async () => {
      return await bindingsServiceA.getRemoteServiceB().chainForward({
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
      const result = await bindingsServiceA.getRemoteServiceB().doSomething();
      return logData({
        fromB: result,
        message: 'Transformed by Service A',
      });
    },
    transformFromC: async () => {
      const result = await bindingsServiceA.getRemoteServiceC().doSomething();
      return logData({
        fromC: result,
        message: 'Transformed by Service A',
      });
    },
    transformFromD: async () => {
      const result = await bindingsServiceA.getRemoteServiceD().doSomething();
      return logData({
        fromD: result,
        message: 'Transformed by Service A',
      });
    },
  };
}
