import {
  createProxyMetaData,
  exposeServiceOnPort,
  mapRemoteServiceOnPort,
} from '@example/definitions';
import { createServiceC } from '@example/service-c';
import { createServiceD } from '@example/service-d';
import * as Comlink from 'comlink';

try {
  const ctx = globalThis as unknown as SharedWorkerGlobalScope;

  const { getMetaData: getMetaDataC, setMetaData: setMetaDataC } =
    createProxyMetaData();
  const { getMetaData: getMetaDataD, setMetaData: setMetaDataD } =
    createProxyMetaData();
  const serviceC = createServiceC(getMetaDataC);
  const serviceD = createServiceD(getMetaDataD);

  ctx.onconnect = (evt) => {
    const [port] = evt.ports;
    Comlink.expose(
      {
        exposeServiceOnPort: exposeServiceOnPort(
          {
            'c-service': serviceC,
            'd-service': serviceD,
          },
          {
            'c-service': setMetaDataC,
            'd-service': setMetaDataD,
          }
        ),
        mapRemoteServiceOnPort: mapRemoteServiceOnPort(),
        workerInfo: () => ({
          title: 'Worker Three',
        }),
      },
      port
    );
  };
} catch (error) {
  console.error(error);
}
