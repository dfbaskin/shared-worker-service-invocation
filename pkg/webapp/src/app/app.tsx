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
          onClick={cb(() =>
            getRemoteServiceA().then((svc) => svc.doSomething())
          )}
        />
        <CallButton
          text={['A', 'B']}
          onClick={cb(() =>
            getRemoteServiceA().then((svc) => svc.transformFromB())
          )}
        />
        <CallButton
          text={['A', 'C']}
          onClick={cb(() =>
            getRemoteServiceA().then((svc) => svc.transformFromC())
          )}
        />
        <CallButton
          text={['A', 'D']}
          onClick={cb(() =>
            getRemoteServiceA().then((svc) => svc.transformFromD())
          )}
        />
        <CallButton
          text={['A', 'B', 'C', 'D']}
          onClick={cb(() =>
            getRemoteServiceA().then((svc) => svc.chainForward())
          )}
        />
      </div>
      <div>
        <span>B-Service:</span>
        <CallButton
          text="B"
          onClick={cb(() =>
            getRemoteServiceB().then((svc) => svc.doSomething())
          )}
        />
        <CallButton
          text={['B', 'A']}
          onClick={cb(() =>
            getRemoteServiceB().then((svc) => svc.transformFromA())
          )}
        />
        <CallButton
          text={['B', 'C']}
          onClick={cb(() =>
            getRemoteServiceB().then((svc) => svc.transformFromC())
          )}
        />
        <CallButton
          text={['B', 'D']}
          onClick={cb(() =>
            getRemoteServiceB().then((svc) => svc.transformFromD())
          )}
        />
      </div>
      <div>
        <span>C-Service:</span>
        <CallButton
          text="C"
          onClick={cb(() =>
            getRemoteServiceC().then((svc) => svc.doSomething())
          )}
        />
        <CallButton
          text={['C', 'A']}
          onClick={cb(() =>
            getRemoteServiceC().then((svc) => svc.transformFromA())
          )}
        />
        <CallButton
          text={['C', 'B']}
          onClick={cb(() =>
            getRemoteServiceC().then((svc) => svc.transformFromB())
          )}
        />
        <CallButton
          text={['C', 'D']}
          onClick={cb(() =>
            getRemoteServiceC().then((svc) => svc.transformFromD())
          )}
        />
      </div>
      <div>
        <span>D-Service:</span>
        <CallButton
          text="D"
          onClick={cb(() =>
            getRemoteServiceD().then((svc) => svc.doSomething())
          )}
        />
        <CallButton
          text={['D', 'A']}
          onClick={cb(() =>
            getRemoteServiceD().then((svc) => svc.transformFromA())
          )}
        />
        <CallButton
          text={['D', 'B']}
          onClick={cb(() =>
            getRemoteServiceD().then((svc) => svc.transformFromB())
          )}
        />
        <CallButton
          text={['D', 'C']}
          onClick={cb(() =>
            getRemoteServiceD().then((svc) => svc.transformFromC())
          )}
        />
        <CallButton
          text={['D', 'C', 'B', 'A']}
          onClick={cb(() =>
            getRemoteServiceD().then((svc) => svc.chainBackward())
          )}
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
