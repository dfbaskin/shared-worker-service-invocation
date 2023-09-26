import { useState } from 'react';
import styles from './app.module.scss';
import {
  getRemoteServiceA,
  getRemoteServiceB,
  getRemoteServiceC,
  getRemoteServiceD,
} from '@example/definitions';

export function App() {
  const [result, setResult] = useState<string>('');
  const doSomethingA = callService(
    () => getRemoteServiceA().doSomething(),
    setResult
  );
  const doSomethingB = callService(
    () => getRemoteServiceB().doSomething(),
    setResult
  );
  const doSomethingC = callService(
    () => getRemoteServiceC().doSomething(),
    setResult
  );
  const doSomethingD = callService(
    () => getRemoteServiceD().doSomething(),
    setResult
  );
  const chainForward = callService(
    () => getRemoteServiceA().chainForward(),
    setResult
  );
  const chainBackward = callService(
    () => getRemoteServiceD().chainBackward(),
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
  fn: () => Promise<unknown>,
  setResult: (value: string) => void
) {
  return () => {
    fn()
      .then((value) => {
        setResult(JSON.stringify(value, null, 2));
      })
      .catch((error) => {
        setResult(JSON.stringify({ error }, null, 2));
      });
  };
}

export default App;
