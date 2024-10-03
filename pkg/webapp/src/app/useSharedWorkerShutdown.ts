import { useCallback, useRef } from 'react';
import { SharedWorkerShutdown } from './workers/sharedWorkerShutdown';

export function useSharedWorkerShutdown() {
  const channelRef = useRef<BroadcastChannel | null>(null);
  if (!channelRef.current) {
    channelRef.current = new BroadcastChannel('shared-workers-channel');
    channelRef.current.onmessage = (
      event: MessageEvent<SharedWorkerShutdown>
    ) => {
      if (event.data.type === 'shutdown') {
        channelRef.current?.close();
        navigateToResetPage();
      }
    };
  }

  const shutdown = useCallback(() => {
    // const broadcast: SharedWorkerShutdown = {
    //   type: 'shutdown',
    // };
    // channelRef.current?.postMessage(broadcast);
    // channelRef.current?.close();
    navigateToResetPage();
  }, []);

  return { shutdown };
}

function navigateToResetPage() {
  window.location.href = '/assets/app-reset.html';
}
