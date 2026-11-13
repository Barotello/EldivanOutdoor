import React from 'react';
import { Phone, MapPin, ArrowRight } from 'lucide-react';
import { CLUB_CONFIG } from '../data/mockData';

export default function ContactFooter() {
  return (
    <section
      id="iletisim"
      tabIndex={-1}
      className="px-5 py-6 bg-sand border-t border-light-outline-variant/60 outline-none"
    >
      {/* Yeşil Kulüp Katılım ve İletişim Kartı */}
      <div className="p-6 rounded-2xl bg-forest text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-accent/20 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2.5">
            <img
              src="/images/logo.jpg"
              alt="Eldivan Outdoor Logo"
              className="w-6 h-6 rounded-full border border-white/20 object-cover"
              loading="lazy"
            />
            <span className="text-[11px] font-mono-tech uppercase font-bold text-[#e6f4ea] tracking-wider">
              ELDİVAN DOĞA VE MOTOR SPORLARI
            </span>
          </div>

          <h2 className="font-headline text-[22px] font-extrabold tracking-tight leading-snug mb-2">
            Doğada Birlikte Keşfedelim.
          </h2>
          <p className="text-white/80 text-[13px] leading-relaxed mb-3">
            Etkinlik takvimi, katılım şartları ve ortak turlarımız için kulüp ekibimizle iletişime geçin.
          </p>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-white/10 border border-white/15 mb-4 text-[12px] text-white/90 font-mono-tech">
            <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <span>{CLUB_CONFIG.address}</span>
          </div>

          {/* Birincil WhatsApp CTA */}
          <a
            href={`https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20Eldivan%20Outdoor%20etkinliklerine%20kat%C4%B1lmak%20istiyorum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-accent text-white font-bold text-[13px] hover:bg-accent-hover active:scale-[0.98] transition-all shadow-md font-mono-tech tracking-wide"
          >
            <span>WHATSAPP İLE İLETİŞİME GEÇ</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Hızlı Saha Aksiyonları: Hemen Ara & Buluşma Noktası Yol Tarifi */}
          <div className="grid grid-cols-2 gap-2.5 mt-3">
            <a
              href={CLUB_CONFIG.phoneHref}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech text-[11px] font-bold active:scale-95 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>Hemen Ara</span>
            </a>

            <a
              href={CLUB_CONFIG.meetingPointMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech text-[11px] font-bold active:scale-95 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Yol Tarifi Al</span>
            </a>
          </div>
        </div>
      </div>

      {/* Atatürk Anma ve Telif Bölümü */}
      <footer className="mt-6 flex items-center justify-between text-xs text-muted font-mono-tech pt-4 border-t border-light-outline-variant/60">
        <span>© 2026 EDMSK HOBİ KULÜBÜ</span>
        <img
          src="/images/ataturk-gozler.jpg"
          alt="Atatürk"
          className="h-5 w-auto rounded border border-black/10"
          loading="lazy"
        />
      </footer>
    </section>
  );
}

