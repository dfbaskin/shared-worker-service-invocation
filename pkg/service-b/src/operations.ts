import { WrappedSpan, createSpan } from "@example/definitions";

export async function operationOne(parentSpan?: WrappedSpan) {
  const timeout = 1000;
  const span = createSpan("operation-one", { parentSpan });
  span.addSpanEvent("Starting operation one.", {
    timeout
  })
  await new Promise((resolve) => setTimeout(resolve, timeout));
  span.setSpanSuccess("Finished operation one.");
  span.endSpan();
  return "operation-one";
}

export async function operationTwo(parentSpan?: WrappedSpan) {
  const timeout = 500;
  const span = createSpan("operation-two", { parentSpan });
  span.addSpanEvent("Starting operation two.", {
    timeout
  })
  await new Promise((resolve) => setTimeout(resolve, timeout));
  span.setSpanSuccess("Finished operation two.");
  span.endSpan();
  return "operation-two";
}
