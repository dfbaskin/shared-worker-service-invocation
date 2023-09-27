import { ServiceD, getRemoteServiceA, getRemoteServiceB, getRemoteServiceC, getWorkerId, logData } from '@example/definitions';

function createResult() {
  return {
    value: 'D-service',
    timestamp: new Date().toISOString(),
    workerId: getWorkerId(),
  };
}

export function createServiceD(): ServiceD {
  return {
    doSomething: () => createResult(),
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
        ...result,
        message: "Transformed by Service D"
      })
    },
    transformFromB: async () => {
      const result = await getRemoteServiceB().doSomething();
      return logData({
        ...result,
        message: "Transformed by Service D"
      })
    }
  };
}
