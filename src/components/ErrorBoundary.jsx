import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uygulama Hatası (ErrorBoundary):', error, errorInfo);
  }

  handleReset = () => {
    try {
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((r) => r.unregister());
        });
      }
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#1F3A2E] text-[#F5F2EA] flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 border border-white/20">
            <img src="/images/app-icon.png" alt="Eldivan Outdoor" className="w-10 h-10 rounded-lg object-cover" />
          </div>
          <h1 className="font-headline font-black text-xl text-white mb-2">
            ELDIVAN OUTDOOR
          </h1>
          <p className="text-xs font-mono-tech text-[#E8B07A] mb-4">
            Bir yükleme sorunu oluştu. Lütfen önbelleği temizleyip yeniden başlatın.
          </p>
          <button
            onClick={this.handleReset}
            className="px-5 py-2.5 rounded-xl bg-[#E8B07A] text-[#1F3A2E] font-bold text-sm shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            Yeniden Başlat
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
