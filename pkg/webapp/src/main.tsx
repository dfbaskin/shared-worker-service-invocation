import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { connectToSharedWorkers } from './app/connectSharedWorkers';
import App from './app/app';

connectToSharedWorkers()
  .then(() => {
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  })
  .catch((err) => {
    console.error(err);
  });
