import {
  ServiceA,
  createSpan,
  getRemoteServiceB,
  getRemoteServiceC,
  getRemoteServiceD,
  getWorkerId,
  logData,
} from '@example/definitions';

export function createServiceA(getMetaData: () => unknown): ServiceA {
  function createResult() {
    return {
      value: 'A-service',
      timestamp: new Date().toISOString(),
      workerId: getWorkerId(),
    };
  }

  function withSpan<T>(name: string, fn: () => T) {
    const span = createSpan(`A-${name}`, {
      spanMetaData: getMetaData(),
    });
    const result = span.withSpan(fn);
    span.endSpan();
    return result;
  }

  async function withSpanAsync<T>(name: string, fn: () => Promise<T>) {
    const span = createSpan(`A-${name}`, {
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
    chainForward: async () => {
      return withSpanAsync('chainForward', async () => {
        const service = await getRemoteServiceB();
        return await service.chainForward({
          a: createResult(),
          order: ['a'],
        });
      });
    },
    chainBackward: async (result) => {
      return withSpan('chainBackward', () => ({
        ...result,
        a: createResult(),
        order: [...result.order, 'a'],
      }));
    },
    transformFromB: async () => {
      return withSpanAsync('transformFromB', async () => {
        const service = await getRemoteServiceB();
        const result = await service.doSomething();
        return logData({
          fromB: result,
          message: 'Transformed by Service A',
        });
      });
    },
    transformFromC: async () => {
      return withSpanAsync('transformFromC', async () => {
        const service = await getRemoteServiceC();
        const result = await service.doSomething();
        return logData({
          fromC: result,
          message: 'Transformed by Service A',
        });
      });
    },
    transformFromD: async () => {
      return withSpanAsync('transformFromD', async () => {
        const service = await getRemoteServiceD();
        const result = await service.doSomething();
        return logData({
          fromD: result,
          message: 'Transformed by Service A',
        });
      });
    },
  };
}
