export type SharedWorkerShutdownMessages =
  | {
      type: 'shutdown';
    }
  | {
      type: 'unloaded';
      sharedWorkerId: string;
      message: string;
    };

export function createSharedWorkersShutdownChannel() {
  return new BroadcastChannel('shared-workers-channel');
}
