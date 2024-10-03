export type SharedWorkerShutdown =
  | {
      type: 'shutdown';
    }
  | {
      type: 'unloaded';
      sharedWorkerId: string;
      message: string;
    };

export function handleSharedWorkerShutdown(
  sharedWorkerId: string,
  scope: SharedWorkerGlobalScope
) {
  const broadcastChannel = new BroadcastChannel('shared-workers-channel');
  const message = `SharedWorker ${sharedWorkerId} is shutting down`;
  broadcastChannel.onmessage = (event: MessageEvent<SharedWorkerShutdown>) => {
    if (event.data.type === 'shutdown') {
      const broadcast: SharedWorkerShutdown = {
        type: 'unloaded',
        sharedWorkerId,
        message,
      };
      broadcastChannel.postMessage(broadcast);
      setTimeout(() => {
        broadcastChannel.close();
        scope.close();
      }, 1000);
    }
  };
}
