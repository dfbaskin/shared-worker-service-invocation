import {
  getRemoteServiceA,
  getRemoteServiceB,
  getRemoteServiceC,
  getRemoteServiceD,
} from '@example/definitions';

// Service A

export async function fromA() {
  const service = await getRemoteServiceA();
  return await service.doSomething();
}

export async function fromAtoB() {
  const service = await getRemoteServiceA();
  return await service.transformFromB();
}

export async function fromAtoC() {
  const service = await getRemoteServiceA();
  return await service.transformFromC();
}

export async function fromAtoD() {
  const service = await getRemoteServiceA();
  return await service.transformFromD();
}

export async function fromAtoBCD() {
  const service = await getRemoteServiceA();
  return await service.chainForward();
}

// Service B

export async function fromB() {
  const service = await getRemoteServiceB();
  return await service.doSomething();
}

export async function fromBtoA() {
  const service = await getRemoteServiceB();
  return await service.transformFromA();
}

export async function fromBtoC() {
  const service = await getRemoteServiceB();
  return await service.transformFromC();
}

export async function fromBtoD() {
  const service = await getRemoteServiceB();
  return await service.transformFromD();
}

// Service C

export async function fromC() {
  const service = await getRemoteServiceC();
  return await service.doSomething();
}

export async function fromCtoA() {
  const service = await getRemoteServiceC();
  return await service.transformFromA();
}

export async function fromCtoB() {
  const service = await getRemoteServiceC();
  return await service.transformFromB();
}

export async function fromCtoD() {
  const service = await getRemoteServiceC();
  return await service.transformFromD();
}

// Service D

export async function fromD() {
  const service = await getRemoteServiceD();
  return await service.doSomething();
}

export async function fromDtoA() {
  const service = await getRemoteServiceD();
  return await service.transformFromA();
}

export async function fromDtoB() {
  const service = await getRemoteServiceD();
  return await service.transformFromB();
}

export async function fromDtoC() {
  const service = await getRemoteServiceD();
  return await service.transformFromC();
}

export async function fromDtoCBA() {
  const service = await getRemoteServiceD();
  return await service.chainBackward();
}
