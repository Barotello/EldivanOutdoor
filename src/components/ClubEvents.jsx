import React from 'react';
import { Calendar, Clock, MapPin, Users, ArrowUpRight } from 'lucide-react';
import { EVENTS_DATA } from '../data/mockData';

export default function ClubEvents() {
  return (
    <section id="etkinlikler" className="px-5 py-6 bg-sand-light/60 border-t border-light-outline-variant/60">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-headline text-[22px] font-black text-ink tracking-tight flex items-center gap-1.5">
          <Calendar className="w-5 h-5 text-accent" />
          <span>Kulüp Programları</span>
        </h2>
        <span className="font-mono-tech text-[10px] font-bold text-accent px-2 py-0.5 rounded bg-accent/10">
          2026 TAKVİMİ
        </span>
      </div>
      <p className="text-[12px] text-muted mb-4">
        Resmi rehberli tırmanışlar, hafta sonu kampları ve motor sporları buluşmaları.
      </p>

      <div className="space-y-3">
        {EVENTS_DATA.map((event) => (
          <div
            key={event.id}
            className="p-4 rounded-2xl bg-white border border-light-outline-variant/80 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded-full bg-forest text-white font-mono-tech text-[9px] font-bold uppercase">
                {event.badge}
              </span>
              <span className="font-mono-tech text-[10px] text-emerald-600 font-bold">
                {event.quota}
              </span>
            </div>

            <h3 className="font-headline font-bold text-[16px] text-ink">
              {event.title}
            </h3>

            <div className="mt-2.5 space-y-1.5 font-mono-tech text-[11px] text-muted">
              <div className="flex items-center gap-1.5 text-ink font-semibold">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>{event.date} · {event.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-muted" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-light-outline-variant/60 flex items-center justify-between">
              <span className="text-[10px] font-mono-tech text-muted">Kulüp Üyelerine Öncelikli</span>
              <a
                href={`https://wa.me/905000000000?text=Merhaba,%20${encodeURIComponent(event.title)}%20etkinligine%20katilmak%20istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-ink text-white font-mono-tech text-[11px] font-bold hover:bg-accent active:scale-95 transition-all"
              >
                <span>Katıl / Bilgi Al</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
