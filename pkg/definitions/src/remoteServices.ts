import * as Comlink from 'comlink';
import { ServiceA, ServiceB, ServiceC, ServiceD } from './services';

function remoteService<T>(name: string) {
  let service: Comlink.Remote<T> | undefined;
  const getService = () => {
    if (!service) {
      console.error(`${name} remote not initialized`);
      throw new Error(`${name} remote not initialized`);
    }
    return service;
  };
  const setService = (remote: Comlink.Remote<T>) => {
    if (service) {
      console.error(`${name} remote already initialized`);
      throw new Error(`${name} remote already initialized`);
    }
    service = remote;
  };
  return { getService, setService };
}

export const { getService: getRemoteServiceA, setService: setRemoteServiceA } =
  remoteService<ServiceA>('ServiceA');
export const { getService: getRemoteServiceB, setService: setRemoteServiceB } =
  remoteService<ServiceB>('ServiceB');
export const { getService: getRemoteServiceC, setService: setRemoteServiceC } =
  remoteService<ServiceC>('ServiceC');
export const { getService: getRemoteServiceD, setService: setRemoteServiceD } =
  remoteService<ServiceD>('ServiceD');
