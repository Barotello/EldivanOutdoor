import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Mountain, Bike, Tent, Activity, Compass, MapPin } from 'lucide-react';
import { CARDS_DATA } from '../data/mockData';
import { useNavigate } from '../lib/router';

const ICON_MAP = {
  Mountain,
  Bike,
  Tent,
  Activity,
  Compass,
  MapPin
};

const pad2 = (n) => String(n).padStart(2, '0');

export default function CardDeck() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState(null); // 'next' → sola çıkar, 'prev' → sağa çıkar
  const isAnimatingRef = useRef(false);
  const timerRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchDeltaRef = useRef(0);
  const swipedRef = useRef(false);

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // direction 1 → sonraki kart (üstteki kart SOLA çıkar), -1 → önceki kart (SAĞA çıkar)
  const changeCard = useCallback((direction = 1) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setSlideDir(direction > 0 ? 'next' : 'prev');

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + direction + CARDS_DATA.length) % CARDS_DATA.length);
      setSlideDir(null);
      isAnimatingRef.current = false;
    }, 300);
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    timerRef.current = setInterval(() => changeCard(1), 5000);
  }, [changeCard, stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  const goToCard = (index) => {
    stopAutoPlay();
    setCurrentIndex(index);
  };

  const openDetail = (card) => {
    if (swipedRef.current) return;
    stopAutoPlay();
    navigate(`/aktivite/${card.id}`);
  };

  const activeData = CARDS_DATA[currentIndex];

  const handleTouchStart = (e) => {
    stopAutoPlay();
    touchStartRef.current = e.touches[0].clientX;
    touchDeltaRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (touchStartRef.current === null) return;
    touchDeltaRef.current = e.touches[0].clientX - touchStartRef.current;
  };

  const handleTouchEnd = () => {
    const delta = touchDeltaRef.current;
    touchStartRef.current = null;
    touchDeltaRef.current = 0;

    if (Math.abs(delta) > 40) {
      // Kaydırmadan sonra parmak kalkarken oluşan "tık" detay sayfasını açmasın
      swipedRef.current = true;
      setTimeout(() => {
        swipedRef.current = false;
      }, 350);
      changeCard(delta < 0 ? 1 : -1); // sola kaydır → sonraki, sağa kaydır → önceki
    }
  };

  return (
    <section className="px-3.5 sm:px-5 pt-2 pb-4 outline-none">
      <div
        className="card-spread-deck"
        role="group"
        aria-label="Aktivite kartları. Sola veya sağa kaydırarak değiştirin"
        onMouseEnter={stopAutoPlay}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {CARDS_DATA.map((card, idx) => {
          const depth = (idx - currentIndex + CARDS_DATA.length) % CARDS_DATA.length;
          const isCurrent = depth === 0;
          const slideClass = isCurrent && slideDir ? (slideDir === 'next' ? 'card-slide-out-left' : 'card-slide-out') : '';
          const IconComp = ICON_MAP[card.icon] || Mountain;

          return (
            <div
              key={card.id}
              data-depth={depth}
              className={`spread-card group ${slideClass}`}
              onClick={() => isCurrent && openDetail(card)}
              role={isCurrent ? 'button' : undefined}
              tabIndex={isCurrent ? 0 : -1}
              aria-label={isCurrent ? `${card.title} detaylarını incele` : undefined}
              onKeyDown={(e) => {
                if (isCurrent && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  openDetail(card);
                }
              }}
            >
              <img
                src={card.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 flex flex-col justify-between p-4 sm:p-5">
                <div className="flex items-center justify-end text-white">
                  <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-sm">
                    <IconComp className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono-tech font-bold text-accent uppercase tracking-wider">
                    {card.tag}
                  </div>
                  <h3 className="font-headline font-black text-white text-[20px] leading-tight mt-1">{card.title}</h3>
                  <p className="text-white/85 text-[12.5px] leading-[18px] mt-1 line-clamp-2">{card.desc}</p>
                  <div className="text-[11px] text-white/90 font-mono-tech mt-2.5 flex items-center justify-between pt-2.5 border-t border-white/20">
                    <span className="font-semibold">{card.dist}</span>
                    <span className="text-accent font-bold tracking-wider flex items-center gap-1 py-1 px-2 -mr-1 rounded-md bg-white/10">
                      SEÇ &amp; İNCELE
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enduro parkur ilerleme çizgisi ve ilerleyen motor simgesi */}
      <div className="w-full max-w-[280px] mx-auto px-4 my-3.5 select-none" aria-label="Deste ilerleme göstergesi">
        <div className="relative h-8 flex items-center justify-between">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] bg-black/10 rounded-full" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentIndex / (CARDS_DATA.length - 1)) * 100}%` }}
          />
          {CARDS_DATA.map((card, dotIdx) => {
            const isPassed = dotIdx <= currentIndex;
            const isCurrent = dotIdx === currentIndex;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => goToCard(dotIdx)}
                aria-label={`${card.title} kartına git`}
                className={`relative z-10 w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  isCurrent
                    ? 'bg-accent scale-125 ring-2 ring-accent/30'
                    : isPassed
                    ? 'bg-accent'
                    : 'bg-black/20 hover:bg-black/40'
                }`}
              />
            );
          })}
          <div
            className="absolute top-1/2 -translate-y-[65%] -translate-x-1/2 transition-all duration-500 ease-out pointer-events-none z-20"
            style={{ left: `${(currentIndex / (CARDS_DATA.length - 1)) * 100}%` }}
          >
            <img src="/images/moto-icon.png" alt="" className="w-7 h-7 object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.28)]" />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono-tech text-muted font-bold mt-1 px-0.5">
          <span className="uppercase text-accent tracking-wider">
            KEŞİF {pad2(currentIndex + 1)} / {pad2(CARDS_DATA.length)}
          </span>
          <span className="text-ink/75 font-semibold truncate max-w-[170px]">{activeData.title}</span>
        </div>
      </div>

      {/* Seçili kart bilgi paneli */}
      <button
        type="button"
        onClick={() => openDetail(activeData)}
        className="w-full text-left p-4 rounded-2xl bg-white border border-light-outline-variant/80 shadow-sm active:scale-[0.99] transition cursor-pointer group"
        aria-label={`${activeData.detailTitle} detaylarını incele`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-accent block mb-1">
              {activeData.badge}
            </span>
            <h3 className="font-headline font-extrabold text-ink text-[17px] leading-snug">{activeData.detailTitle}</h3>
            <p className="text-muted text-[12px] leading-relaxed mt-1">{activeData.desc}</p>
            <div className="text-[10px] font-mono-tech text-muted/80 mt-2 font-semibold">{activeData.meta}</div>
          </div>
          <span className="flex-shrink-0 self-center inline-flex items-center justify-center w-10 h-10 rounded-full bg-ink text-white group-hover:bg-accent transition-all shadow-md">
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </button>
    </section>
  );
}
