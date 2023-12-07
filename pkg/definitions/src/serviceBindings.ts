import * as Comlink from 'comlink';
import {
  isRemoteServiceRegistered,
  mapRemoteService,
} from './serviceRegistration';

export interface SharedWorkerService {
  exposeServiceOnPort: (serviceId: string, port: MessagePort) => Promise<void>;
  mapRemoteServiceOnPort: (
    serviceId: string,
    getMessagePort: () => Promise<MessagePort>
  ) => Promise<boolean>;
  workerInfo: () => Promise<{
    title: string;
  }>;
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
    const getMessagePortOnlyIfNeeded = Comlink.proxy(async () => {
      const { port1, port2 } = new MessageChannel();
      await provider.exposeServiceOnPort(
        serviceId,
        Comlink.transfer(port1, [port1])
      );
      return Comlink.transfer(port2, [port2]);
    });
    const registered = await remote.mapRemoteServiceOnPort(
      serviceId,
      getMessagePortOnlyIfNeeded
    );
    if (!registered) {
      const { title } = await remote.workerInfo();
      console.log(
        `Service "${serviceId}" was previously registered for ${title}.`
      );
    }
  }
}

export function exposeServiceOnPort(
  services: Record<string, unknown>,
  setMetaData?: Record<string, (metadata: unknown) => void>
) {
  return (serviceId: string, port: MessagePort) => {
    if (serviceId in services) {
      const service = {
        ...(services[serviceId] as Record<string, unknown>),
        setMetaData:
          setMetaData?.[serviceId] ??
          (() => {
            /*NOOP*/
          }),
      };
      Comlink.expose(service, port);
    } else {
      throw new Error(
        `Service "${serviceId}" is not implemented by this worker.`
      );
    }
  };
}

export function mapRemoteServiceOnPort() {
  return async (
    serviceId: string,
    getMessagePortOnlyIfNeeded: () => Promise<MessagePort>
  ) => {
    if (isRemoteServiceRegistered(serviceId)) {
      return false;
    }
    const port = await getMessagePortOnlyIfNeeded();
    mapRemoteService(serviceId, Comlink.wrap(port));
    return true;
  };
}
