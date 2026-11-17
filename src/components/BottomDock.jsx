import React from 'react';
import { Compass, Route, Calendar, Navigation, Menu } from 'lucide-react';
import { Link } from '../lib/router';
import { useAppUi } from '../context/AppUiContext';

const TABS = [
  { id: '/', label: 'Keşif', icon: Compass },
  { id: '/rotalar', label: 'Rotalar', icon: Route },
  { id: '/etkinlikler', label: 'Etkinlik', icon: Calendar },
  { id: '/harita', label: 'Harita', icon: Navigation }
];

export default function BottomDock({ activePath }) {
  const { openMenu } = useAppUi();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none px-3 pb-[max(8px,env(safe-area-inset-bottom))]">
      <nav
        aria-label="Alt gezinme menüsü"
        className="w-full max-w-[378px] h-[58px] bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-light-outline-variant/80 flex items-center justify-between p-1.5 pointer-events-auto"
      >
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = activePath === id;
          return (
            <Link
              key={id}
              to={id}
              aria-current={active ? 'page' : undefined}
              className={`flex-1 h-full flex flex-col items-center justify-center rounded-xl transition-all duration-200 active:scale-95 no-underline select-none ${
                active ? 'text-ink font-bold bg-sand-dark/85' : 'text-muted hover:text-ink hover:bg-black/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-mono-tech text-[11px] tracking-tight mt-0.5 leading-none">{label}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={openMenu}
          aria-label="Menüyü aç"
          className="flex-1 h-full flex flex-col items-center justify-center rounded-xl text-muted hover:text-ink hover:bg-black/5 active:scale-95 transition-all cursor-pointer select-none"
        >
          <Menu className="w-5 h-5" />
          <span className="font-mono-tech text-[11px] tracking-tight mt-0.5 leading-none">Menü</span>
        </button>
      </nav>
    </div>
  );
}
