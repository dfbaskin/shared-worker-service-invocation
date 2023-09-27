import { ServiceA, getRemoteServiceB, getWorkerId, logData } from '@example/definitions';

function createResult() {
  return {
    value: 'A-service',
    timestamp: new Date().toISOString(),
    workerId: getWorkerId(),
  };
}

export function createServiceA(): ServiceA {
  return {
    doSomething: () => createResult(),
    chainForward: async () => {
      return await getRemoteServiceB().chainForward({
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
      const result = await getRemoteServiceB().doSomething();
      return logData({
        ...result,
        message: "Transformed by Service A"
      })
    }
  };
}
