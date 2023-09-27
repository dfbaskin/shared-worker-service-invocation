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
  const callService = callServiceFactory(setResult);

  return (
    <div className={styles.view}>
      <div>
        <span>Direct to Services:</span>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceA().doSomething())}
        >
          A
        </button>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceB().doSomething())}
        >
          B
        </button>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceC().doSomething())}
        >
          C
        </button>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceD().doSomething())}
        >
          D
        </button>
      </div>
      <div>
        <span>Service-to-Service:</span>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceA().transformFromB())}
        >
          A » B
        </button>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceB().doSomething())}
        >
          B
        </button>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceC().transformFromA())}
        >
          C » A
        </button>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceC().transformFromB())}
        >
          C » B
        </button>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceD().transformFromA())}
        >
          D » A
        </button>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceD().transformFromB())}
        >
          D » B
        </button>
      </div>
      <div>
        <span>Chaining Services:</span>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceA().chainForward())}
        >
          Chain Forward
        </button>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceD().chainBackward())}
        >
          Chain Backward
        </button>
      </div>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
}

function callServiceFactory(setResult: (value: string) => void) {
  return (fn: () => Promise<unknown>) => {
    return () => {
      fn()
        .then((value) => {
          setResult(JSON.stringify(value, null, 2));
        })
        .catch((error) => {
          console.error(error);
          setResult(JSON.stringify({ error }, null, 2));
        });
    };
  };
}

export default App;
