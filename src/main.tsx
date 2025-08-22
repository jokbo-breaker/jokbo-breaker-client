import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NavermapsProvider } from 'react-naver-maps';
import { startKeepAlive } from './shared/libs/keep-alive';
import './shared/styles/index.css';
import App from './App';
import 'virtual:svg-icons-register';
startKeepAlive();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavermapsProvider ncpKeyId={import.meta.env.VITE_NAVER_MAPS_KEY}>
      <App />
    </NavermapsProvider>
  </StrictMode>,
);
