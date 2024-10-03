import { useRef } from 'react';
import {
  SharedWorkerShutdownMessages,
  createSharedWorkersShutdownChannel,
} from './workers/sharedWorkerShutdownChannel';

export function useSharedWorkerShutdown() {
  const channelRef = useRef<BroadcastChannel | null>(null);
  if (!channelRef.current) {
    channelRef.current = createSharedWorkersShutdownChannel();
    channelRef.current.onmessage = (
      event: MessageEvent<SharedWorkerShutdownMessages>
    ) => {
      if (event.data.type === 'shutdown') {
        channelRef.current?.close();
        navigateToResetPage();
      }
    };
  }

  return { shutdown: navigateToResetPage };
}

function navigateToResetPage() {
  window.location.href = '/assets/app-reset.html';
}
