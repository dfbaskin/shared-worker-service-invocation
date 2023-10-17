import * as Comlink from 'comlink';

const serviceRegistrationState = (function () {
  let instance: ReturnType<typeof create> | undefined;

  function create() {
    const remoteServiceMap = new Map<string, unknown>();
    return { remoteServiceMap };
  }

  return () => {
    return instance ?? (instance = create());
  };
})();

export async function getRemoteService<T>(
  serviceId: string
): Promise<Comlink.Remote<T>> {
  const { remoteServiceMap } = serviceRegistrationState();
  const remoteService = remoteServiceMap.get(serviceId) as
    | Comlink.Remote<T>
    | undefined;
  if (!remoteService) {
    throw new Error(
      `Remote service with id ${serviceId} has not been registered`
    );
  }
  return remoteService;
}

export function isRemoteServiceRegistered(serviceId: string) {
  const { remoteServiceMap } = serviceRegistrationState();
  return remoteServiceMap.has(serviceId);
}

export function mapRemoteService<T>(
  serviceId: string,
  service: Comlink.Remote<T>
) {
  const { remoteServiceMap } = serviceRegistrationState();
  if (remoteServiceMap.has(serviceId)) {
    throw new Error(
      `Remote service with id ${serviceId} is already registered`
    );
  }
  remoteServiceMap.set(serviceId, service);
}
