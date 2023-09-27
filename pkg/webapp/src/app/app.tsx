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
        <span>Do Something:</span>
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
        <span>Get Settings:</span>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceA().transformSettings())}
        >
          A
        </button>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceB().getSettings())}
        >
          B
        </button>
        <button
          type="button"
          onClick={callService(() => getRemoteServiceC().transformSettings())}
        >
          C
        </button>
      </div>
      <div>
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
          setResult(JSON.stringify({ error }, null, 2));
        });
    };
  };
}

export default App;
