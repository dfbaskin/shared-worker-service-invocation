import { getRemoteService } from "./serviceDiscovery";
import { ServiceA, ServiceB, ServiceC, ServiceD } from "./services";

export function getRemoteServiceA() {
  return getRemoteService<ServiceA>('a-service');
}

export function getRemoteServiceB() {
  return getRemoteService<ServiceB>('b-service');
}

export function getRemoteServiceC() {
  return getRemoteService<ServiceC>('c-service');
}

export function getRemoteServiceD() {
  return getRemoteService<ServiceD>('d-service');
}
