import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { LocaleProvider } from './contexts/Locale/LocaleContext';
import '@/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>
);
