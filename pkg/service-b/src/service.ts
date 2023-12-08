import {
  ServiceB,
  getWorkerId,
  logData,
  getRemoteServiceA,
  getRemoteServiceC,
  getRemoteServiceD,
  createSpan,
} from '@example/definitions';

export function createServiceB(getMetaData: () => unknown): ServiceB {
  function createResult() {
    return {
      value: 'B-service',
      timestamp: new Date().toISOString(),
      workerId: getWorkerId(),
    };
  }

  function withSpan<T>(name: string, fn: () => T) {
    const span = createSpan(`B-${name}`, {
      spanMetaData: getMetaData(),
    });
    const result = span.withSpan(fn);
    span.endSpan();
    return result;
  }

  async function withSpanAsync<T>(name: string, fn: () => Promise<T>) {
    const span = createSpan(`B-${name}`, {
      spanMetaData: getMetaData(),
    });
    const result = await span.withSpan(fn);
    span.endSpan();
    return result;
  }

  return {
    doSomething: () => {
      return withSpan('doSomething', () =>
        logData({
          ...createResult(),
        })
      );
    },
    chainForward: async (result) => {
      return withSpanAsync('chainForward', () =>
        getRemoteServiceC().chainForward({
          ...result,
          b: createResult(),
          order: [...result.order, 'b'],
        })
      );
    },
    chainBackward: async (result) => {
      return withSpanAsync('chainBackward', () =>
        getRemoteServiceA().chainBackward({
          ...result,
          b: createResult(),
          order: [...result.order, 'b'],
        })
      );
    },
    transformFromA: async () => {
      return withSpanAsync('transformFromA', async () => {
        const result = await getRemoteServiceA().doSomething();
        return logData({
          fromA: result,
          message: 'Transformed by Service B',
        });
      });
    },
    transformFromC: async () => {
      return withSpanAsync('transformFromC', async () => {
        const result = await getRemoteServiceC().doSomething();
        return logData({
          fromC: result,
          message: 'Transformed by Service B',
        });
      });
    },
    transformFromD: async () => {
      return withSpanAsync('transformFromD', async () => {
        const result = await getRemoteServiceD().doSomething();
        return logData({
          fromD: result,
          message: 'Transformed by Service B',
        });
      });
    },
  };
}
