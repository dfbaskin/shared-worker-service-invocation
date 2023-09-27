import { ServiceA, getRemoteServiceB, getWorkerId, logData } from '@example/definitions';

function createResult() {
  return {
    value: 'a',
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
    transformSettings: async () => {
      const settings = await getRemoteServiceB().getSettings();
      return logData({
        ...settings,
        message: "Transformed by Service A"
      })
    },
  };
}
