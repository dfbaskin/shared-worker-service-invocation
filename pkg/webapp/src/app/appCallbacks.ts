import {
  getCurrentSpan,
  getRemoteServiceA,
  getRemoteServiceB,
  getRemoteServiceC,
  getRemoteServiceD,
} from '@example/definitions';

async function withService<
  T extends {
    setMetaData: (metadata: unknown) => Promise<void>;
  }
>(service: T): Promise<T> {
  const span = getCurrentSpan();
  await service.setMetaData(span.getSpanMetaData());
  return service;
}

// Service A

async function withServiceA() {
  return await withService(getRemoteServiceA());
}

export async function fromA() {
  const service = await withServiceA();
  return await service.doSomething();
}

export async function fromAtoB() {
  const service = await withServiceA();
  return await service.transformFromB();
}

export async function fromAtoC() {
  const service = await withServiceA();
  return await service.transformFromC();
}

export async function fromAtoD() {
  const service = await withServiceA();
  return await service.transformFromD();
}

export async function fromAtoBCD() {
  const service = await withServiceA();
  return await service.chainForward();
}

// Service B

async function withServiceB() {
  return await withService(getRemoteServiceB());
}

export async function fromB() {
  const service = await withServiceB();
  return await service.doSomething();
}

export async function fromBtoA() {
  const service = await withServiceB();
  return await service.transformFromA();
}

export async function fromBtoC() {
  const service = await withServiceB();
  return await service.transformFromC();
}

export async function fromBtoD() {
  const service = await withServiceB();
  return await service.transformFromD();
}

// Service C

async function withServiceC() {
  return await withService(getRemoteServiceC());
}

export async function fromC() {
  const service = await withServiceC();
  return await service.doSomething();
}

export async function fromCtoA() {
  const service = await withServiceC();
  return await service.transformFromA();
}

export async function fromCtoB() {
  const service = await withServiceC();
  return await service.transformFromB();
}

export async function fromCtoD() {
  const service = await withServiceC();
  return await service.transformFromD();
}

// Service D

async function withServiceD() {
  return await withService(getRemoteServiceD());
}

export async function fromD() {
  const service = await withServiceD();
  return await service.doSomething();
}

export async function fromDtoA() {
  const service = await withServiceD();
  return await service.transformFromA();
}

export async function fromDtoB() {
  const service = await withServiceD();
  return await service.transformFromB();
}

export async function fromDtoC() {
  const service = await withServiceD();
  return await service.transformFromC();
}

export async function fromDtoCBA() {
  const service = await withServiceD();
  return await service.chainBackward();
}
