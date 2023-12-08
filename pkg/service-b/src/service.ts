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
      return withSpanAsync('chainForward', async () => {
        const service = await getRemoteServiceC();
        return await service.chainForward({
          ...result,
          b: createResult(),
          order: [...result.order, 'b'],
        });
      });
    },
    chainBackward: async (result) => {
      return withSpanAsync('chainBackward', async () => {
        const service = await getRemoteServiceA();
        return await service.chainBackward({
          ...result,
          b: createResult(),
          order: [...result.order, 'b'],
        });
      });
    },
    transformFromA: async () => {
      return withSpanAsync('transformFromA', async () => {
        const service = await getRemoteServiceA();
        const result = await service.doSomething();
        return logData({
          fromA: result,
          message: 'Transformed by Service B',
        });
      });
    },
    transformFromC: async () => {
      return withSpanAsync('transformFromC', async () => {
        const service = await getRemoteServiceC();
        const result = await service.doSomething();
        return logData({
          fromC: result,
          message: 'Transformed by Service B',
        });
      });
    },
    transformFromD: async () => {
      return withSpanAsync('transformFromD', async () => {
        const service = await getRemoteServiceD();
        const result = await service.doSomething();
        return logData({
          fromD: result,
          message: 'Transformed by Service B',
        });
      });
    },
  };
}
