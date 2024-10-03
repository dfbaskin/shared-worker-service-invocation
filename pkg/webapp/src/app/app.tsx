import { useState } from 'react';
import styles from './app.module.scss';
import { CallButton } from './callButton';
import { callbackGenerator } from './callbackGenerator';
import {
  fromA,
  fromAtoB,
  fromAtoBCD,
  fromAtoC,
  fromAtoD,
  fromB,
  fromBtoA,
  fromBtoC,
  fromBtoD,
  fromC,
  fromCtoA,
  fromCtoB,
  fromCtoD,
  fromD,
  fromDtoA,
  fromDtoB,
  fromDtoC,
  fromDtoCBA,
} from './appCallbacks';
import { useSharedWorkerShutdown } from './useSharedWorkerShutdown';

export function App() {
  const [result, setResult] = useState<string>('');
  const cb = callbackGenerator(setResult);
  const { shutdown } = useSharedWorkerShutdown();

  return (
    <div className={styles.view}>
      <div>
        <span>A-Service:</span>
        <CallButton text="A" onClick={cb(fromA)} />
        <CallButton text={['A', 'B']} onClick={cb(fromAtoB)} />
        <CallButton text={['A', 'C']} onClick={cb(fromAtoC)} />
        <CallButton text={['A', 'D']} onClick={cb(fromAtoD)} />
        <CallButton text={['A', 'B', 'C', 'D']} onClick={cb(fromAtoBCD)} />
      </div>
      <div>
        <span>B-Service:</span>
        <CallButton text="B" onClick={cb(fromB)} />
        <CallButton text={['B', 'A']} onClick={cb(fromBtoA)} />
        <CallButton text={['B', 'C']} onClick={cb(fromBtoC)} />
        <CallButton text={['B', 'D']} onClick={cb(fromBtoD)} />
      </div>
      <div>
        <span>C-Service:</span>
        <CallButton text="C" onClick={cb(fromC)} />
        <CallButton text={['C', 'A']} onClick={cb(fromCtoA)} />
        <CallButton text={['C', 'B']} onClick={cb(fromCtoB)} />
        <CallButton text={['C', 'D']} onClick={cb(fromCtoD)} />
      </div>
      <div>
        <span>D-Service:</span>
        <CallButton text="D" onClick={cb(fromD)} />
        <CallButton text={['D', 'A']} onClick={cb(fromDtoA)} />
        <CallButton text={['D', 'B']} onClick={cb(fromDtoB)} />
        <CallButton text={['D', 'C']} onClick={cb(fromDtoC)} />
        <CallButton text={['D', 'C', 'B', 'A']} onClick={cb(fromDtoCBA)} />
      </div>
      <div>
        <span>Controls:</span>
        <button type="button" onClick={() => shutdown()}>
          Reset
        </button>
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
