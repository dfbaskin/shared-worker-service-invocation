import { deferredPromise } from './deferredPromise';
import {
  ServiceDiscoveryMessages,
  isFindServiceMessage,
  isServiceLocatedMessage,
} from './serviceDiscoveryMessages';
import { getUniqueId } from './uniqueIds';
import { wrap, expose, transfer, Remote } from 'comlink';

const serviceDiscoveryState = (function () {
  let instance: ReturnType<typeof create> | undefined;

  function create() {
    // const localServiceMap = new Map<string, unknown>();
    const remoteServiceMap = new Map<string, unknown>();

    // const channelName = 'service-discovery-channel';
    // const channel = new BroadcastChannel(channelName);

    // channel.addEventListener('message', ({ data: message }) => {
    //   if (isFindServiceMessage(message)) {
    //     const service = localServiceMap.get(message.serviceId);
    //     if (service) {
    //       const { port1, port2 } = new MessageChannel();
    //       expose(service, port1);
    //       const response: ServiceDiscoveryMessages = {
    //         type: 'serviceLocated',
    //         serviceId: message.serviceId,
    //         requestId: message.requestId,
    //         // This doesn't work for BroadcastChannel
    //         port: transfer(port2, [port2]),
    //       };
    //       return channel.postMessage(response);
    //     }
    //   }
    // });
    // channel.addEventListener('messageerror', ({ data }) => {
    //   console.error('Error in broadcast channel', data);
    // });

    // const findRemoteService = <T>(
    //   serviceId: string,
    //   options?: {
    //     timeout?: number;
    //   }
    // ) => {
    //   const { timeout = 5000 } = options ?? {};
    //   const requestId = getUniqueId();

    //   const [promise, resolve, reject] = deferredPromise<Remote<T>>();

    //   channel.addEventListener('message', onMessage);

    //   const timeoutId = setTimeout(() => {
    //     channel.removeEventListener('message', onMessage);
    //     reject(new Error(`No response received for service ${serviceId}`));
    //   }, timeout);

    //   function onMessage({ data: message }: MessageEvent) {
    //     if (isServiceLocatedMessage(message)) {
    //       if (message.requestId === requestId) {
    //         channel.removeEventListener('message', onMessage);
    //         clearTimeout(timeoutId);
    //         resolve(wrap<T>(message.port));
    //       }
    //     }
    //   }

    //   const request: ServiceDiscoveryMessages = {
    //     type: 'findService',
    //     serviceId,
    //     requestId,
    //   };
    //   channel.postMessage(request);
    //   return promise;
    // };

    // const close = () => {
    //   channel.close();
    //   localServiceMap.clear();
    //   remoteServiceMap.clear();
    // };

    // return { localServiceMap, remoteServiceMap, close, findRemoteService };
    return { remoteServiceMap };
  }

  return () => {
    return instance ?? (instance = create());
  };
})();

export async function getRemoteService<T>(
  serviceId: string
): Promise<Remote<T>> {
  const { remoteServiceMap } =
    serviceDiscoveryState();

  // Has the service already been discovered?
  const remoteService = remoteServiceMap.get(serviceId) as Remote<T> | undefined;
  if (!remoteService) {
    throw new Error(`Service with id ${serviceId} not found`);
  }
  return remoteService;

  // const { localServiceMap, remoteServiceMap, findRemoteService } =
  //   serviceDiscoveryState();

  // // Has the service already been discovered?
  // let remoteService = remoteServiceMap.get(serviceId) as Remote<T> | undefined;
  // if (!remoteService) {
  //   // Is the service instance available locally?
  //   const localService = localServiceMap.get(serviceId);
  //   if (localService) {
  //     const { port1, port2 } = new MessageChannel();
  //     expose(localService, port1);
  //     remoteService = wrap<T>(port2);
  //   } else {
  //     // Find the remote service from other workers
  //     remoteService = await findRemoteService<T>(serviceId);
  //   }
  //   remoteServiceMap.set(serviceId, remoteService);
  // }
  // return remoteService;
}

// export function registerServiceInstance(serviceId: string, service: unknown) {
//   const { localServiceMap } = serviceDiscoveryState();
//   if (localServiceMap.has(serviceId)) {
//     throw new Error(`Service with id ${serviceId} already registered`);
//   }

//   localServiceMap.set(serviceId, service);
// }

export function mapRemoteService(serviceId: string, service: unknown) {
  const { remoteServiceMap } = serviceDiscoveryState();
  if (remoteServiceMap.has(serviceId)) {
    throw new Error(`Remote service with id ${serviceId} is already registered`);
  }

  remoteServiceMap.set(serviceId, service);
}
