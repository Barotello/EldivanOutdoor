import React, { useMemo } from 'react';
import { CalendarX, ChevronRight } from 'lucide-react';
import { Link } from '../lib/router';
import { getUpcomingEvents } from '../lib/events';

// Ana ekranda "Sıradaki etkinlik" kartı: katılım noktası en üste yakın dursun.
export default function NextEventCard() {
  const next = useMemo(() => getUpcomingEvents()[0], []);

  return (
    <section className="px-3.5 pt-1 pb-3.5">
      <div className="text-[11px] font-mono-tech font-extrabold tracking-[0.12em] text-accent mb-2">
        SIRADAKİ ETKİNLİK
      </div>
      <Link
        to="/etkinlikler"
        className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-light-outline-variant/80 shadow-sm no-underline active:scale-[0.99] transition"
        aria-label={next ? `${next.title}, etkinlik takvimini aç` : 'Etkinlik takvimini aç'}
      >
        {next?.image ? (
          <img src={next.image} alt="" className="w-[58px] h-[58px] rounded-[14px] object-cover" />
        ) : (
          <div className="w-[58px] h-[58px] rounded-[14px] bg-forest flex items-center justify-center">
            <CalendarX className="w-6 h-6 text-[#E8B07A]" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-headline font-black text-[15px] text-ink leading-snug line-clamp-2">
            {next ? next.title : 'Yeni etkinlikler yakında'}
          </div>
          <div className="text-[12px] font-bold text-ink-muted mt-0.5 truncate">
            {next ? `${next.date} · ${next.time}` : 'Takvimi ve kulüp programlarını incele'}
          </div>
        </div>
        <ChevronRight className="w-[18px] h-[18px] text-muted flex-shrink-0" />
      </Link>
    </section>
  );
}
