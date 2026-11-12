import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md px-3.5 pt-[max(12px,env(safe-area-inset-top))] pb-2.5 flex items-center justify-center border-b border-light-outline-variant/40">
      {/* Ortalanmış Logo & Marka İsmi */}
      <a href="#kesif" className="flex items-center justify-center gap-2 no-underline">
        <img
          src="/images/app-icon.png"
          alt="Eldivan Outdoor İkonu"
          className="w-7 h-7 rounded-full shadow-sm border border-black/10 object-cover flex-shrink-0"
        />
        <div className="font-headline font-black text-[18px] tracking-tighter text-ink flex items-center gap-0.5">
          <span>ELDIVAN</span>
          <span className="text-ink">OUTDOOR</span>
          <span className="text-accent text-[22px] leading-none">.</span>
        </div>
      </a>
    </header>
  );
}
