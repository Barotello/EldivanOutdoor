import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full flex justify-center pointer-events-none px-3 pt-[max(8px,env(safe-area-inset-top))] pb-1.5">
      {/* Alt menü gibi yuvarlatılmış (border-radius: rounded-2xl) yüzen kapsayıcı */}
      <div className="w-full max-w-[390px] h-13 bg-white/95 backdrop-blur-lg rounded-2xl shadow-md border border-light-outline-variant/80 flex items-center justify-center px-4 pointer-events-auto transition-all">
        {/* Ortalanmış Logo & Marka İsmi */}
        <a href="#kesif" className="flex items-center justify-center gap-2 no-underline select-none">
          <img
            src="/images/app-icon.png"
            alt="Eldivan Outdoor İkonu"
            className="w-7 h-7 rounded-full shadow-sm border border-black/10 object-cover flex-shrink-0"
          />
          <div className="font-headline font-black text-[17px] tracking-tighter text-ink flex items-center gap-0.5">
            <span>ELDIVAN</span>
            <span className="text-ink">OUTDOOR</span>
            <span className="text-accent text-[20px] leading-none">.</span>
          </div>
        </a>
      </div>
    </header>
  );
}
