import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from '../lib/router';

// Rota ve aktivite detayları için tam ekran şablon:
// büyük görsel + geri butonu + içerik + altta sabit aksiyon butonları.
export default function DetailLayout({ image, tag, title, badges = [], children, actions = [] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pb-[calc(env(safe-area-inset-bottom,0px)+104px)]">
      <div className="relative h-[320px] bg-forest">
        {image && <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/90 flex flex-col justify-end p-5">
          {tag ? <div className="text-[#E8B07A] text-[11px] leading-[15px] font-mono-tech font-extrabold tracking-wider">{tag}</div> : null}
          <h1 className="font-headline text-white text-[25px] leading-[31px] font-black mt-1">{title}</h1>
        </div>
        <button
          type="button"
          onClick={() => navigate.back()}
          aria-label="Geri"
          className="absolute left-3.5 top-[max(14px,env(safe-area-inset-top))] w-10 h-10 rounded-full bg-white/95 flex items-center justify-center cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-[22px] h-[22px] text-ink" />
        </button>
      </div>

      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 px-[18px] pt-4">
          {badges.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-sand border border-light-outline-variant text-[11.5px] leading-[15px] font-extrabold text-ink"
            >
              {Icon ? <Icon className="w-[13px] h-[13px] text-accent" /> : null}
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="p-[18px] flex flex-col gap-3">{children}</div>

      {actions.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
          <div className="w-full max-w-[402px] flex gap-2.5 px-4 pt-3 pb-[max(14px,env(safe-area-inset-bottom))] bg-white/97 backdrop-blur border-t border-light-outline-variant">
            {actions.map(({ label, icon: Icon, onClick }, i) => {
              const primary = i === actions.length - 1;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={onClick}
                  className={`flex-1 min-h-12 py-2.5 px-2 rounded-[14px] flex items-center justify-center gap-1.5 text-[13px] leading-[17px] font-extrabold cursor-pointer active:scale-[0.98] ${
                    primary ? 'bg-forest text-white' : 'bg-sand-dark border border-light-outline-variant text-ink'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function Section({ heading, icon: Icon, children, tone = 'sand' }) {
  return (
    <div
      className={`p-3.5 rounded-2xl border ${
        tone === 'forest' ? 'bg-forest/[0.06] border-forest/15' : 'bg-sand-light border-light-outline-variant'
      }`}
    >
      {heading ? (
        <div className="flex items-center gap-1.5 mb-1.5">
          {Icon ? <Icon className="w-[15px] h-[15px] text-accent" /> : null}
          <h2 className="text-[11px] leading-[15px] font-mono-tech font-extrabold tracking-wider text-accent">{heading}</h2>
        </div>
      ) : null}
      <div className="text-[14px] leading-[21px] text-ink">{children}</div>
    </div>
  );
}

// Uzun değerler ("Sabit İstasyon", "24+ Saat") taşmasın diye satır düzeni:
// solda ikon + etiket, sağda değer; değer gerekirse alt satıra geçer.
export function MetricRow({ items }) {
  return (
    <div className="rounded-2xl bg-sand border border-light-outline-variant px-3.5">
      {items.map(({ label, value, icon: Icon }, i) => (
        <div
          key={label}
          className={`flex items-center justify-between gap-3 py-3 ${i > 0 ? 'border-t border-light-outline-variant' : ''}`}
        >
          <div className="flex items-center gap-2 text-[14px] leading-[19px] font-bold text-ink-muted">
            <Icon className="w-[17px] h-[17px] text-accent" />
            {label}
          </div>
          <div className="text-right text-[15px] leading-5 font-black text-ink min-w-0">{value}</div>
        </div>
      ))}
    </div>
  );
}
