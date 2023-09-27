export function callbackGenerator(setResult: (value: string) => void) {
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
