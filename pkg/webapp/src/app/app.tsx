import { useState } from 'react';
import styles from './app.module.scss';
import { getWorkerApi } from './connectSharedWorkers';

export function App() {
  const [result, setResult] = useState<string>('');
  const doSomethingA = callService(
    (api) => api.serviceA.doSomething(),
    setResult
  );
  const doSomethingB = callService(
    (api) => api.serviceB.doSomething(),
    setResult
  );
  const doSomethingC = callService(
    (api) => api.serviceC.doSomething(),
    setResult
  );
  const doSomethingD = callService(
    (api) => api.serviceD.doSomething(),
    setResult
  );
  const chainForward = callService(
    (api) => api.serviceA.chainForward(),
    setResult
  );
  const chainBackward = callService(
    (api) => api.serviceD.chainBackward(),
    setResult
  );

  return (
    <div className={styles.view}>
      <div>
        <button type="button" onClick={() => doSomethingA()}>
          A
        </button>
        <button type="button" onClick={() => doSomethingB()}>
          B
        </button>
        <button type="button" onClick={() => doSomethingC()}>
          C
        </button>
        <button type="button" onClick={() => doSomethingD()}>
          D
        </button>
      </div>
      <div>
        <button type="button" onClick={() => chainForward()}>
          Chain Forward
        </button>
        <button type="button" onClick={() => chainBackward()}>
          Chain Backward
        </button>
      </div>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
}

function callService(
  fn: (api: ReturnType<typeof getWorkerApi>) => Promise<unknown>,
  setResult: (value: string) => void
) {
  return () => {
    const api = getWorkerApi();
    fn(api)
      .then((value) => {
        setResult(JSON.stringify(value, null, 2));
      })
      .catch((error) => {
        setResult(JSON.stringify({ error }, null, 2));
      });
  };
}

export default App;
