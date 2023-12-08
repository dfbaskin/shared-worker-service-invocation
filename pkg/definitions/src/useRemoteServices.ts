import { getRemoteService } from './serviceRegistration';
import { ServiceA, ServiceB, ServiceC, ServiceD } from './services';
import { getCurrentSpan } from './telemetry';

type MetaDataMethods = {
  setMetaData: (metadata: unknown) => Promise<void>;
};

export function getRemoteServiceA() {
  return withService(getRemoteService<ServiceA & MetaDataMethods>('a-service'));
}

export function getRemoteServiceB() {
  return withService(getRemoteService<ServiceB & MetaDataMethods>('b-service'));
}

export function getRemoteServiceC() {
  return withService(getRemoteService<ServiceC & MetaDataMethods>('c-service'));
}

export function getRemoteServiceD() {
  return withService(getRemoteService<ServiceD & MetaDataMethods>('d-service'));
}

async function withService<
  T extends {
    setMetaData: (metadata: unknown) => Promise<void>;
  }
>(service: T): Promise<T> {
  const span = getCurrentSpan();
  await service.setMetaData(span.getSpanMetaData());
  return service;
}
