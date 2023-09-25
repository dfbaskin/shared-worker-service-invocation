const workerId = globalThis.crypto.randomUUID();

export function getWorkerId() {
  return workerId;
}
