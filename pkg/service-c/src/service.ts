import {
  ServiceC,
  getWorkerId,
  logData,
  getRemoteServiceA,
  getRemoteServiceB,
  getRemoteServiceD,
  createSpan,
} from '@example/definitions';

export function createServiceC(getMetaData: () => unknown): ServiceC {
  function createResult() {
    return {
      value: 'C-service',
      timestamp: new Date().toISOString(),
      workerId: getWorkerId(),
    };
  }

  function withSpan<T>(name: string, fn: () => T) {
    const span = createSpan(`C-${name}`, {
      spanMetaData: getMetaData(),
    });
    const result = span.withSpan(fn);
    span.endSpan();
    return result;
  }

  async function withSpanAsync<T>(name: string, fn: () => Promise<T>) {
    const span = createSpan(`C-${name}`, {
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
        const service = await getRemoteServiceD();
        return await service.chainForward({
          ...result,
          c: createResult(),
          order: [...result.order, 'c'],
        });
      });
    },
    chainBackward: async (result) => {
      return withSpanAsync('chainBackward', async () => {
        const service = await getRemoteServiceB();
        return await service.chainBackward({
          ...result,
          c: createResult(),
          order: [...result.order, 'c'],
        });
      });
    },
    transformFromA: async () => {
      return withSpanAsync('transformFromA', async () => {
        const service = await getRemoteServiceA();
        const result = await service.doSomething();
        return logData({
          fromA: result,
          message: 'Transformed by Service C',
        });
      });
    },
    transformFromB: async () => {
      return withSpanAsync('transformFromB', async () => {
        const service = await getRemoteServiceB();
        const result = await service.doSomething();
        return logData({
          fromB: result,
          message: 'Transformed by Service C',
        });
      });
    },
    transformFromD: async () => {
      return withSpanAsync('transformFromD', async () => {
        const service = await getRemoteServiceD();
        const result = await service.doSomething();
        return logData({
          fromD: result,
          message: 'Transformed by Service C',
        });
      });
    },
  };
}
