import {
  ServiceD,
  getWorkerId,
  logData,
  servicesBindings,
} from '@example/definitions';

function createResult() {
  return {
    value: 'D-service',
    timestamp: new Date().toISOString(),
    workerId: getWorkerId(),
  };
}

export const bindingsServiceD = servicesBindings();

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
      return await bindingsServiceD.getRemoteServiceC().chainBackward({
        d: createResult(),
        order: ['d'],
      });
    },
    transformFromA: async () => {
      const result = await bindingsServiceD.getRemoteServiceA().doSomething();
      return logData({
        fromA: result,
        message: 'Transformed by Service D',
      });
    },
    transformFromB: async () => {
      const result = await bindingsServiceD.getRemoteServiceB().doSomething();
      return logData({
        fromB: result,
        message: 'Transformed by Service D',
      });
    },
    transformFromC: async () => {
      const result = await bindingsServiceD.getRemoteServiceC().doSomething();
      return logData({
        fromC: result,
        message: 'Transformed by Service D',
      });
    },
  };
}
