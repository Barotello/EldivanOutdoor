import React, { useEffect } from 'react';
import { X, Compass, Route, Calendar, CloudSun, MapPin } from 'lucide-react';

export default function DrawerMenu({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const navItems = [
    { id: 'kesif', label: 'Ana Sayfa (Keşfet)', icon: Compass },
    { id: 'rotalar', label: 'Rotalar & Parkurlar', icon: Route },
    { id: 'saha', label: 'Saha & Canlı Harita', icon: CloudSun },
    { id: 'etkinlikler', label: 'Kulüp Programları & Takvim', icon: Calendar },
  ];

  const handleNavClick = (id) => {
    onClose();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Arka plan karartması */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sağdan Açılan Panel */}
      <aside
        className={`absolute top-0 right-0 w-[80%] max-w-xs h-full bg-white text-ink shadow-2xl flex flex-col p-5 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-light-outline-variant">
          <div className="flex items-center gap-2">
            <img
              src="/images/app-icon.png"
              alt="Eldivan Outdoor"
              className="w-7 h-7 rounded-full shadow-sm border border-black/10"
            />
            <div className="font-headline font-black text-lg">
              ELDIVAN OUTDOOR<span className="text-accent">.</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="w-8 h-8 rounded-full bg-sand-dark flex items-center justify-center text-ink hover:bg-ink hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-2 font-mono-tech text-sm font-semibold overflow-y-auto">
          {navItems.map((item) => {
            const IconComp = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-sand text-ink transition-colors"
              >
                <IconComp className="w-4 h-4 text-accent" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-light-outline-variant font-mono-tech text-[11px] text-muted space-y-2">
          <div className="flex items-center justify-between">
            <span>SÜRÜM</span>
            <span className="font-bold text-ink">v2.0 React</span>
          </div>
          <div className="flex items-center justify-between">
            <span>KULÜP HATTI</span>
            <span className="font-bold text-accent">+90 500 000 00 00</span>
          </div>
          <div className="text-[10px] text-muted/70 text-center pt-2">
            Eldivan Doğa ve Motor Sporları Kulübü
          </div>
        </div>
      </aside>
    </div>
  );
}
