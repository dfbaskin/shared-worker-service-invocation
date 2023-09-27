import {
  ServiceC,
  getWorkerId,
  logData,
  servicesBindings,
} from '@example/definitions';

function createResult() {
  return {
    value: 'C-service',
    timestamp: new Date().toISOString(),
    workerId: getWorkerId(),
  };
}

export const bindingsServiceC = servicesBindings();

export function createServiceC(): ServiceC {
  return {
    doSomething: () => logData(createResult()),
    chainForward: async (result) => {
      return await bindingsServiceC.getRemoteServiceD().chainForward({
        ...result,
        c: createResult(),
        order: [...result.order, 'c'],
      });
    },
    chainBackward: async (result) => {
      return await bindingsServiceC.getRemoteServiceB().chainBackward({
        ...result,
        c: createResult(),
        order: [...result.order, 'c'],
      });
    },
    transformFromA: async () => {
      const result = await bindingsServiceC.getRemoteServiceA().doSomething();
      return logData({
        fromA: result,
        message: 'Transformed by Service C',
      });
    },
    transformFromB: async () => {
      const result = await bindingsServiceC.getRemoteServiceB().doSomething();
      return logData({
        fromB: result,
        message: 'Transformed by Service C',
      });
    },
    transformFromD: async () => {
      const result = await bindingsServiceC.getRemoteServiceD().doSomething();
      return logData({
        fromD: result,
        message: 'Transformed by Service C',
      });
    },
  };
}
