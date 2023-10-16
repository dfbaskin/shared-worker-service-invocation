export function getUniqueId() {
  return globalThis.crypto.randomUUID();
}
