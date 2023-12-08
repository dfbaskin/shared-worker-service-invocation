import {
  ServiceD,
  getWorkerId,
  logData,
  getRemoteServiceA,
  getRemoteServiceB,
  getRemoteServiceC,
  createSpan,
} from '@example/definitions';

export function createServiceD(getMetaData: () => unknown): ServiceD {
  function createResult() {
    return {
      value: 'D-service',
      timestamp: new Date().toISOString(),
      workerId: getWorkerId(),
    };
  }

  function withSpan<T>(name: string, fn: () => T) {
    const span = createSpan(`D-${name}`, {
      spanMetaData: getMetaData(),
    });
    const result = span.withSpan(fn);
    span.endSpan();
    return result;
  }

  async function withSpanAsync<T>(name: string, fn: () => Promise<T>) {
    const span = createSpan(`D-${name}`, {
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
      return withSpan('chainForward', () => ({
        ...result,
        d: createResult(),
        order: [...result.order, 'd'],
      }));
    },
    chainBackward: async () => {
      return withSpanAsync('chainBackward', () =>
        getRemoteServiceC().chainBackward({
          d: createResult(),
          order: ['d'],
        })
      );
    },
    transformFromA: async () => {
      return withSpanAsync('transformFromA', async () => {
        const result = await getRemoteServiceA().doSomething();
        return logData({
          fromA: result,
          message: 'Transformed by Service D',
        });
      });
    },
    transformFromB: async () => {
      return withSpanAsync('transformFromB', async () => {
        const result = await getRemoteServiceB().doSomething();
        return logData({
          fromB: result,
          message: 'Transformed by Service D',
        });
      });
    },
    transformFromC: async () => {
      return withSpanAsync('transformFromC', async () => {
        const result = await getRemoteServiceC().doSomething();
        return logData({
          fromC: result,
          message: 'Transformed by Service D',
        });
      });
    },
  };
}
