import { getRemoteService } from './serviceRegistration';
import { ServiceA, ServiceB, ServiceC, ServiceD } from './services';

type MetaDataMethods = {
  setMetaData: (metadata: unknown) => Promise<void>;
};

export function getRemoteServiceA() {
  return getRemoteService<ServiceA & MetaDataMethods>('a-service');
}

export function getRemoteServiceB() {
  return getRemoteService<ServiceB & MetaDataMethods>('b-service');
}

export function getRemoteServiceC() {
  return getRemoteService<ServiceC & MetaDataMethods>('c-service');
}

export function getRemoteServiceD() {
  return getRemoteService<ServiceD & MetaDataMethods>('d-service');
}
