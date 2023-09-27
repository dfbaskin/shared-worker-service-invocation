import {
  ServiceB,
  getWorkerId,
  logData,
  servicesBindings,
} from '@example/definitions';

function createResult() {
  return {
    value: 'B-service',
    timestamp: new Date().toISOString(),
    workerId: getWorkerId(),
  };
}

export const bindingsServiceB = servicesBindings();

export function createServiceB(): ServiceB {
  return {
    doSomething: () => logData(createResult()),
    chainForward: async (result) => {
      return await bindingsServiceB.getRemoteServiceC().chainForward({
        ...result,
        b: createResult(),
        order: [...result.order, 'b'],
      });
    },
    chainBackward: async (result) => {
      return await bindingsServiceB.getRemoteServiceA().chainBackward({
        ...result,
        b: createResult(),
        order: [...result.order, 'b'],
      });
    },
    transformFromA: async () => {
      const result = await bindingsServiceB.getRemoteServiceA().doSomething();
      return logData({
        fromA: result,
        message: 'Transformed by Service B',
      });
    },
    transformFromC: async () => {
      const result = await bindingsServiceB.getRemoteServiceC().doSomething();
      return logData({
        fromC: result,
        message: 'Transformed by Service B',
      });
    },
    transformFromD: async () => {
      const result = await bindingsServiceB.getRemoteServiceD().doSomething();
      return logData({
        fromD: result,
        message: 'Transformed by Service B',
      });
    },
  };
}
