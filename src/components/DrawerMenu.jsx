import React, { useEffect } from 'react';
import { X, Compass, Route, Calendar, CloudSun, MapPin, PlayCircle } from 'lucide-react';
import { CLUB_CONFIG } from '../data/mockData';

export default function DrawerMenu({ isOpen, onClose, onReplaySplash }) {
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
    { id: 'saha', label: 'Saha & Hava Koşulları', icon: CloudSun },
    { id: 'etkinlikler', label: 'Kulüp Programları & Takvim', icon: Calendar },
    { id: 'iletisim', label: 'İletişim & Konum', icon: MapPin }
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

        <div className="pt-3 border-t border-light-outline-variant">
          <a
            href={`https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20Eldivan%20Outdoor%20etkinliklerine%20kat%C4%B1lmak%20istiyorum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-mono-tech text-xs font-bold hover:bg-[#1fbb59] transition-colors mb-2 shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp ile Yazın</span>
          </a>

          <button
            type="button"
            onClick={() => {
              onClose();
              onReplaySplash?.();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-sand-dark text-muted hover:text-ink text-xs font-mono-tech transition-colors mb-3"
          >
            <PlayCircle className="w-4 h-4 text-accent" />
            <span>Açılış Animasyonunu Oynat</span>
          </button>

          <div className="font-mono-tech text-[11px] text-muted space-y-1 text-center">
            <div className="font-bold text-ink">{CLUB_CONFIG.coordinates}</div>
            <div className="text-[10px] text-muted/80">
              Eldivan, Çankırı · {CLUB_CONFIG.phoneDisplay}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
