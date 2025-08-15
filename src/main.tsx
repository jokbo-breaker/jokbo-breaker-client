import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './shared/styles/index.css';
import App from './App';
import 'virtual:svg-icons-register';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
}
