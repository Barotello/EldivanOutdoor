import React from 'react';
import { Compass, Route, Calendar, Menu } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { CLUB_CONFIG } from '../data/mockData';

export default function BottomDock({ activeTab, onTabSelect }) {
  const { toggleSidebar } = useSidebar();

  const handleNavClick = (e, id) => {
    e.preventDefault();
    onTabSelect?.(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
      elem.focus({ preventScroll: true });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none px-3 pb-[max(8px,env(safe-area-inset-bottom))]">
      <nav
        aria-label="Alt Gezinme Menüsü"
        className="scrollspy-nav w-full max-w-[390px] h-14 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-light-outline-variant/80 flex items-center justify-between px-1.5 pointer-events-auto"
      >
        {/* Tab 1: Keşif */}
        <a
          href="#kesif"
          onClick={(e) => handleNavClick(e, 'kesif')}
          aria-current={activeTab === 'kesif' ? 'true' : 'false'}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 no-underline ${
            activeTab === 'kesif' ? 'target-current text-ink font-bold' : 'text-muted hover:text-ink'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="font-mono-tech text-[10px] tracking-tight mt-0.5">Keşif</span>
        </a>

        {/* Tab 2: Rotalar */}
        <a
          href="#rotalar"
          onClick={(e) => handleNavClick(e, 'rotalar')}
          aria-current={activeTab === 'rotalar' ? 'true' : 'false'}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 no-underline ${
            activeTab === 'rotalar' ? 'target-current text-ink font-bold' : 'text-muted hover:text-ink'
          }`}
        >
          <Route className="w-5 h-5" />
          <span className="font-mono-tech text-[10px] tracking-tight mt-0.5">Rotalar</span>
        </a>

        {/* Tab 3: Etkinlik */}
        <a
          href="#etkinlikler"
          onClick={(e) => handleNavClick(e, 'etkinlikler')}
          aria-current={activeTab === 'etkinlikler' ? 'true' : 'false'}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 no-underline ${
            activeTab === 'etkinlikler'
              ? 'target-current text-ink font-bold'
              : 'text-muted hover:text-ink'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="font-mono-tech text-[10px] tracking-tight mt-0.5">Etkinlik</span>
        </a>

        {/* Tab 4: WhatsApp */}
        <a
          href={`https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20Eldivan%20Outdoor%20etkinliklerine%20kat%C4%B1lmak%20istiyorum.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 text-[#25D366] hover:opacity-80 active:scale-95 transition-all no-underline"
          title="WhatsApp İletişim Hattı"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
            </svg>
          </div>
          <span className="font-mono-tech text-[10px] font-bold tracking-tight text-[#1f7a42] mt-0.5">
            WhatsApp
          </span>
        </a>

        {/* Tab 5: Menü (Shadcn Sidebar Tetikleyici) */}
        <button
          type="button"
          onClick={() => toggleSidebar()}
          className="flex-1 flex flex-col items-center justify-center py-1 text-muted hover:text-ink active:scale-95 transition-all"
          aria-label="Menüyü Aç"
        >
          <Menu className="w-5 h-5" />
          <span className="font-mono-tech text-[10px] tracking-tight mt-0.5">Menü</span>
        </button>
      </nav>
    </div>
  );
}
