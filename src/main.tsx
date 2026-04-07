import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function initApp() {
  const appRoot = document.getElementById('app');
  if (!appRoot) {
    throw new Error('Missing #app root container.');
  }

  createRoot(appRoot).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    initApp();
  } catch (e) {
    console.error(e);
    const appRoot = document.getElementById('app');
    if (appRoot) {
      appRoot.innerHTML = `<h2>App failed to load</h2><pre>${String(e)}</pre>`;
    }
  }
});
