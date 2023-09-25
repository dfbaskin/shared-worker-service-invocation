import { useState } from 'react';
import styles from './app.module.scss';
import { getWorkerApi } from './services';

export function App() {
  const [result, setResult] = useState<string>('');
  const doSomethingA = () => {
    const api = getWorkerApi();
    api.serviceA
      .doSomething()
      .then((value) => {
        setResult(JSON.stringify(value, null, 2));
      })
      .catch((error) => {
        setResult(JSON.stringify({ error }, null, 2));
      });
  };
  return (
    <div className={styles.view}>
      <div>
        <button type="button" onClick={() => doSomethingA()}>
          A
        </button>
      </div>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
}

export default App;
