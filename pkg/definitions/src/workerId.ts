import { getUniqueId } from './uniqueIds';

const workerId = getUniqueId();

export function getWorkerId() {
  return workerId;
}
