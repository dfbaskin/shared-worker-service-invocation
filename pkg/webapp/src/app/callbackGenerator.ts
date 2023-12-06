import { tracer } from '../logging';

export function callbackGenerator(setResult: (value: string) => void) {
  return (fn: () => Promise<unknown>) => {
    return (text: string) => {
      const span = tracer.startSpan(text);
      setResult('Pending ...');
      fn()
        .then((value) => {
          setResult(JSON.stringify(value, null, 2));
          span.end();
        })
        .catch((error) => {
          console.error(error);
          setResult(JSON.stringify({ error }, null, 2));
          span.end();
        });
    };
  };
}
