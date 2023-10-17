import * as Comlink from 'comlink';
import { mapRemoteService } from './serviceRegistration';

export interface SharedWorkerService {
  exposeServiceOnPort: (serviceId: string, port: MessagePort) => Promise<void>;
  mapRemoteServiceOnPort: (
    serviceId: string,
    port: MessagePort
  ) => Promise<void>;
}

export function wrapSharedWorkerService(port: MessagePort) {
  return Comlink.wrap<SharedWorkerService>(port);
}

export async function exposeService(
  serviceId: string,
  workerSvc: SharedWorkerService
) {
  const { port1, port2 } = new MessageChannel();
  await workerSvc.exposeServiceOnPort(
    serviceId,
    Comlink.transfer(port1, [port1])
  );
  mapRemoteService(serviceId, Comlink.wrap(port2));
}

export async function mapServiceToService(
  serviceId: string,
  provider: SharedWorkerService,
  to: Iterable<SharedWorkerService>
) {
  for (const remote of to) {
    const { port1, port2 } = new MessageChannel();
    await provider.exposeServiceOnPort(
      serviceId,
      Comlink.transfer(port1, [port1])
    );
    await remote.mapRemoteServiceOnPort(
      serviceId,
      Comlink.transfer(port2, [port2])
    );
  }
}

export function exposeServiceOnPort(services: Record<string, unknown>) {
  return (serviceId: string, port: MessagePort) => {
    if (serviceId in services) {
      Comlink.expose(services[serviceId], port);
    } else {
      throw new Error(
        `Service "${serviceId}" is not implemented by this worker.`
      );
    }
  };
}

export function mapRemoteServiceOnPort() {
  return (serviceId: string, port: MessagePort) => {
    mapRemoteService(serviceId, Comlink.wrap(port));
  };
}
