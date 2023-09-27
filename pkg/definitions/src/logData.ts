import { getWorkerId } from './workerId';

export function logData<T>(data: T): T {
  console.log(`--- From ${getWorkerId()} ---`);
  console.log(JSON.stringify(data, null, 2));
  return data;
}
