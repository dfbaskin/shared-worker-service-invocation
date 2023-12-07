import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { connectToSharedWorkers } from './app/connectSharedWorkers';
import App from './app/app';

initializeApp();

async function initializeApp() {
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
  } catch (error) {
    console.error(error);
  }
}
