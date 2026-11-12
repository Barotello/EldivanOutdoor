import React from 'react';
import { Calendar, MapPin, ArrowUpRight, CalendarPlus } from 'lucide-react';
import { PACKAGES_DATA, EVENTS_DATA, CLUB_CONFIG } from '../data/mockData';

export default function ClubEvents() {
  return (
    <section
      id="etkinlikler"
      tabIndex={-1}
      className="px-5 py-6 bg-sand-light/60 border-t border-light-outline-variant/60 outline-none scroll-mt-6"
    >
      {/* Üst Başlık: Kulüp Programları & Paketler */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-accent text-[10px] font-mono-tech uppercase font-bold tracking-wider mb-0.5">
            ÖNERİLEN DENEYİMLER
          </div>
          <h2 className="font-headline text-[22px] font-black text-ink tracking-tight flex items-center gap-1.5">
            <span>Kulüp Programları</span>
          </h2>
        </div>
        <span className="font-mono-tech text-[10px] font-bold text-accent px-2 py-0.5 rounded bg-accent/10">
          2026 SEZONU
        </span>
      </div>

      {/* Görselli Hizmet & Paket Kartları */}
      <div className="space-y-4 mb-6">
        {PACKAGES_DATA.map((pkg) => (
          <article
            key={pkg.id}
            className="relative rounded-2xl overflow-hidden shadow-sm border border-light-outline-variant/80 min-h-[265px] flex flex-col justify-end group select-none"
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Beyaz Opak Gradyan: Alttaki yazıların net okunmasını garantiler */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent" />

            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-ink text-white backdrop-blur-md text-[10px] font-mono-tech uppercase font-bold tracking-wider shadow-sm">
                {pkg.badge}
              </span>
            </div>

            <div className="relative z-10 p-5 pt-8">
              <h3 className="font-headline font-black text-ink text-[18px] leading-snug">
                {pkg.title}
              </h3>
              {/* Koyu, Net ve Okunaklı Açıklama Yazısı */}
              <p className="text-[#2B2A25] font-medium text-[13px] leading-relaxed mt-1 line-clamp-2">
                {pkg.desc}
              </p>

              <div className="flex items-center justify-between pt-3.5 mt-3 border-t border-black/10">
                <div>
                  <span className="text-[10.5px] font-mono-tech text-[#4D4B42] font-bold uppercase tracking-wider block">
                    {pkg.priceLabel}
                  </span>
                  <span className="font-mono-tech text-[20px] font-black text-ink">
                    {pkg.price}
                  </span>
                </div>
                <a
                  href={`https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20${encodeURIComponent(pkg.title)}%20programi%20icin%20rezervasyon%20ve%20bilgi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-white font-mono-tech text-[11px] font-bold hover:bg-accent active:scale-95 transition-all shadow-sm no-underline cursor-pointer"
                >
                  <span>REZERVASYON</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Yaklaşan Etkinlik Takvimi */}
      <div className="flex items-center justify-between mb-4 pt-4 border-t border-light-outline-variant/60">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-accent" />
          <h3 className="font-headline text-[18px] font-extrabold text-ink">
            Yaklaşan Etkinlik Takvimi
          </h3>
        </div>
        <span className="font-mono-tech text-[10px] font-bold text-accent px-2 py-0.5 rounded bg-accent/10">
          RESMİ TAKVİM
        </span>
      </div>

      <div className="space-y-4">
        {EVENTS_DATA.map((event) => (
          <article
            key={event.id}
            className="relative rounded-2xl overflow-hidden shadow-sm border border-light-outline-variant/80 min-h-[265px] flex flex-col justify-end group hover:shadow-md transition-shadow select-none"
          >
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            )}
            {/* Beyaz Opak Gradyan */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent" />

            {/* Sol Üst Rozet */}
            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-forest text-white backdrop-blur-md text-[10px] font-mono-tech uppercase font-bold tracking-wider shadow-sm">
                {event.badge}
              </span>
            </div>

            {/* Kart İçerik Gövdesi */}
            <div className="relative z-10 p-5 pt-8">
              <h4 className="font-headline font-black text-ink text-[18px] leading-snug">
                {event.title}
              </h4>
              {event.desc && (
                <p className="text-[#2B2A25] font-medium text-[13px] leading-relaxed mt-1 line-clamp-2">
                  {event.desc}
                </p>
              )}

              {/* Tarih & Konum Bilgisi (Koyu ve Yüksek Kontrastlı) */}
              <div className="mt-3 space-y-1 font-mono-tech text-[11.5px]">
                <div className="flex items-center gap-1.5 text-ink font-bold">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <span>
                    {event.date} · {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[#4D4B42] font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#4D4B42]" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Alt Butonlar */}
              <div className="flex items-center justify-between pt-3.5 mt-3 border-t border-black/10 gap-2">
                {event.calendarUrl ? (
                  <a
                    href={event.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sand-dark text-ink font-mono-tech text-[10px] font-bold hover:bg-ink hover:text-white active:scale-95 transition-all no-underline cursor-pointer"
                    title="Google Takvime Ekle"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-accent" />
                    <span>Takvime Ekle</span>
                  </a>
                ) : (
                  <span className="text-[10px] font-mono-tech text-[#4D4B42] font-bold">
                    Kulüp Üyelerine Özel
                  </span>
                )}

                <a
                  href={`https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20${encodeURIComponent(event.title)}%20etkinligine%20katilmak%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-white font-mono-tech text-[11px] font-bold hover:bg-accent active:scale-95 transition-all shadow-sm no-underline cursor-pointer"
                >
                  <span>KATIL / BİLGİ AL</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
