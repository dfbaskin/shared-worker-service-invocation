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
    console.log(`${name} remote initialized`);
    service = remote;
  };
  return { getService, setService };
}

// Static bindings
export const { getService: getRemoteServiceA, setService: setRemoteServiceA } =
  remoteService<ServiceA>('ServiceA');
export const { getService: getRemoteServiceB, setService: setRemoteServiceB } =
  remoteService<ServiceB>('ServiceB');
export const { getService: getRemoteServiceC, setService: setRemoteServiceC } =
  remoteService<ServiceC>('ServiceC');
export const { getService: getRemoteServiceD, setService: setRemoteServiceD } =
  remoteService<ServiceD>('ServiceD');

// Worker service bindings
export function servicesBindings() {
  const { getService: getRemoteServiceA, setService: setRemoteServiceA } =
    remoteService<ServiceA>('ServiceA');
  const { getService: getRemoteServiceB, setService: setRemoteServiceB } =
    remoteService<ServiceB>('ServiceB');
  const { getService: getRemoteServiceC, setService: setRemoteServiceC } =
    remoteService<ServiceC>('ServiceC');
  const { getService: getRemoteServiceD, setService: setRemoteServiceD } =
    remoteService<ServiceD>('ServiceD');
  return {
    getRemoteServiceA,
    setRemoteServiceA,
    getRemoteServiceB,
    setRemoteServiceB,
    getRemoteServiceC,
    setRemoteServiceC,
    getRemoteServiceD,
    setRemoteServiceD,
  };
}
