import {
  SharedWorkerShutdownMessages,
  createSharedWorkersShutdownChannel,
} from './sharedWorkerShutdownChannel';

export function handleSharedWorkerShutdown(
  sharedWorkerId: string,
  scope: SharedWorkerGlobalScope
) {
  const broadcastChannel = createSharedWorkersShutdownChannel();
  broadcastChannel.onmessage = (
    event: MessageEvent<SharedWorkerShutdownMessages>
  ) => {
    if (event.data.type === 'shutdown') {
      const broadcast: SharedWorkerShutdownMessages = {
        type: 'unloaded',
        sharedWorkerId,
        message: `SharedWorker ${sharedWorkerId} is shutting down`,
      };
      broadcastChannel.postMessage(broadcast);
      setTimeout(() => {
        broadcastChannel.close();
        scope.close();
      }, 1000);
    }
  };
}
