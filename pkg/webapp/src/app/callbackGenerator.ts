import { createSpan } from '@example/definitions';

export function callbackGenerator(setResult: (value: string) => void) {
  return (fn: () => Promise<unknown>) => {
    return (text: string) => {
      const span = createSpan(text);
      span.withSpan(async () => {
        setResult('Pending ...');
        await fn()
          .then((value) => {
            setResult(JSON.stringify(value, null, 2));
            span.endSpan();
          })
          .catch((error) => {
            console.error(error);
            setResult(JSON.stringify({ error }, null, 2));
            span.setSpanError(error);
            span.endSpan();
          });
      });
    };
  };
}
