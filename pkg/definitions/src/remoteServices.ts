import * as Comlink from 'comlink';
import { ServiceA, ServiceB, ServiceC, ServiceD } from './services';

let serviceA: Comlink.Remote<ServiceA> | undefined;
let serviceB: Comlink.Remote<ServiceB> | undefined;
let serviceC: Comlink.Remote<ServiceC> | undefined;
let serviceD: Comlink.Remote<ServiceD> | undefined;

export function getRemoteServiceA() {
  if (!serviceA) {
    throw new Error('ServiceA remote not initialized');
  }
  return serviceA;
}

export function setRemoteServiceA(remote: Comlink.Remote<ServiceA>) {
  if (serviceA) {
    throw new Error('ServiceA already initialized');
  }
  serviceA = remote;
}

export function getRemoteServiceB() {
  if (!serviceB) {
    throw new Error('ServiceB remote not initialized');
  }
  return serviceB;
}

export function setRemoteServiceB(remote: Comlink.Remote<ServiceB>) {
  if (serviceB) {
    throw new Error('ServiceB already initialized');
  }
  serviceB = remote;
}

export function getRemoteServiceC() {
  if (!serviceC) {
    throw new Error('ServiceC remote not initialized');
  }
  return serviceC;
}

export function setRemoteServiceC(remote: Comlink.Remote<ServiceC>) {
  if (serviceC) {
    throw new Error('ServiceC already initialized');
  }
  serviceC = remote;
}

export function getRemoteServiceD() {
  if (!serviceD) {
    throw new Error('ServiceD remote not initialized');
  }
  return serviceD;
}

export function setRemoteServiceD(remote: Comlink.Remote<ServiceD>) {
  if (serviceD) {
    throw new Error('ServiceD already initialized');
  }
  serviceD = remote;
}
