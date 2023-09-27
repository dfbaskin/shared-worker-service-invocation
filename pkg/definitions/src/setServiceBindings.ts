import * as Comlink from 'comlink';

type BindingFn = (port: MessagePort) => Promise<void>;

export async function setServiceBindings(bindings: [BindingFn, BindingFn][]) {
  for (const [binder1, binder2] of bindings) {
    await setServiceBinding(binder1, binder2);
  }
}

export async function setServiceBinding(
  binder1: BindingFn,
  binder2: BindingFn
) {
  const mc = new MessageChannel();
  await binder1(Comlink.transfer(mc.port1, [mc.port1]));
  await binder2(Comlink.transfer(mc.port2, [mc.port2]));
}
