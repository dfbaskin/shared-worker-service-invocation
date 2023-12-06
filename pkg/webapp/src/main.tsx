import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { connectToSharedWorkers } from './app/connectSharedWorkers';
import App from './app/app';
import { getTracer } from '@example/definitions';

initializeApp();

async function initializeApp() {
  const tracer = getTracer();
  const span = tracer.startSpan('Initialize App');
  try {
    await connectToSharedWorkers();

    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    span.end();
  } catch (err) {
    console.error(err);
    span.end();
  }
}
