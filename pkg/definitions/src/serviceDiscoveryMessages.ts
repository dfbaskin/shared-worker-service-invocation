export type ServiceDiscoveryMessages =
  | {
      type: 'findService';
      serviceId: string;
      requestId: string;
    }
  | {
      type: 'serviceLocated';
      serviceId: string;
      requestId: string;
      port: MessagePort;
    };

export function isServiceDiscoveryMessage(
  message: unknown
): message is ServiceDiscoveryMessages {
  return typeof message === 'object' && message !== null && 'type' in message;
}

export function isFindServiceMessage(
  message: unknown
): message is ServiceDiscoveryMessages & { type: 'findService' } {
  return isServiceDiscoveryMessage(message) && message.type === 'findService';
}

export function isServiceLocatedMessage(
  message: unknown
): message is ServiceDiscoveryMessages & { type: 'serviceLocated' } {
  return (
    isServiceDiscoveryMessage(message) && message.type === 'serviceLocated'
  );
}
