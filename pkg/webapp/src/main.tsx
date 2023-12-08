import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { connectToSharedWorkers } from './app/connectSharedWorkers';
import { createSpan, initializeTelemetry } from '@example/definitions';
import App from './app/app';

initializeTelemetry({
  serviceName: 'web-app',
});

const span = createSpan('initialize');

try {
  await connectToSharedWorkers();
  span.addSpanEvent('Connected to shared workers.');

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  span.addSpanEvent('Rendered UI.');
} catch (error) {
  span.setSpanError(error);
}

span.endSpan();
