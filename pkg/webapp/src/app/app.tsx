import { useState } from 'react';
import styles from './app.module.scss';
import {
  getRemoteServiceA,
  getRemoteServiceB,
  getRemoteServiceC,
  getRemoteServiceD,
} from '@example/definitions';
import { CallButton } from './callButton';
import { callbackGenerator } from './callbackGenerator';

export function App() {
  const [result, setResult] = useState<string>('');
  const cb = callbackGenerator(setResult);

  return (
    <div className={styles.view}>
      <div>
        <span>A-Service:</span>
        <CallButton
          text="A"
          onClick={cb(() => getRemoteServiceA().doSomething())}
        />
        <CallButton
          text={['A', 'B']}
          onClick={cb(() => getRemoteServiceA().transformFromB())}
        />
        <CallButton
          text={['A', 'C']}
          onClick={cb(() => getRemoteServiceA().transformFromC())}
        />
        <CallButton
          text={['A', 'D']}
          onClick={cb(() => getRemoteServiceA().transformFromD())}
        />
        <CallButton
          text={['A', 'B', 'C', 'D']}
          onClick={cb(() => getRemoteServiceA().chainForward())}
        />
      </div>
      <div>
        <span>B-Service:</span>
        <CallButton
          text="B"
          onClick={cb(() => getRemoteServiceB().doSomething())}
        />
        <CallButton
          text={['B', 'A']}
          onClick={cb(() => getRemoteServiceB().transformFromA())}
        />
        <CallButton
          text={['B', 'C']}
          onClick={cb(() => getRemoteServiceB().transformFromC())}
        />
        <CallButton
          text={['B', 'D']}
          onClick={cb(() => getRemoteServiceB().transformFromD())}
        />
      </div>
      <div>
        <span>C-Service:</span>
        <CallButton
          text="C"
          onClick={cb(() => getRemoteServiceC().doSomething())}
        />
        <CallButton
          text={['C', 'A']}
          onClick={cb(() => getRemoteServiceC().transformFromA())}
        />
        <CallButton
          text={['C', 'B']}
          onClick={cb(() => getRemoteServiceC().transformFromB())}
        />
        <CallButton
          text={['C', 'D']}
          onClick={cb(() => getRemoteServiceC().transformFromD())}
        />
      </div>
      <div>
        <span>D-Service:</span>
        <CallButton
          text="D"
          onClick={cb(() => getRemoteServiceD().doSomething())}
        />
        <CallButton
          text={['D', 'A']}
          onClick={cb(() => getRemoteServiceD().transformFromA())}
        />
        <CallButton
          text={['D', 'B']}
          onClick={cb(() => getRemoteServiceD().transformFromB())}
        />
        <CallButton
          text={['D', 'C']}
          onClick={cb(() => getRemoteServiceD().transformFromC())}
        />
        <CallButton
          text={['D', 'C', 'B', 'A']}
          onClick={cb(() => getRemoteServiceD().chainBackward())}
        />
      </div>
      {result && (
        <div>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
