import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Safari ve Chrome'da Service Worker / Cache kaynaklı güvenlik ve başlatma hatalarını güvenli temizle
try {
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().catch(() => {});
      }
    }).catch(() => {});
  }
} catch (e) {
  // Safari Private Browsing veya kısıtlı ortamlarda sessizce geç
}

try {
  if (typeof window !== 'undefined' && 'caches' in window) {
    window.caches?.keys().then((names) => {
      for (const name of names) {
        window.caches?.delete(name).catch(() => {});
      }
    }).catch(() => {});
  }
} catch (e) {
  // Safari Private Browsing SecurityError önleme
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
