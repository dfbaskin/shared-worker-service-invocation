export function createProxyMetaData() {
  let current: unknown = {};
  const setMetaData = (metadata: unknown) => {
    current = metadata ?? {};
  };
  const getMetaData = () => current;
  return { setMetaData, getMetaData };
}
