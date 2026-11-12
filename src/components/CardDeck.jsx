import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Mountain, Bike, Tent, Activity, Compass, MapPin } from 'lucide-react';
import { CARDS_DATA } from '../data/mockData';

const ICON_MAP = {
  Mountain,
  Bike,
  Tent,
  Activity,
  Compass,
  MapPin
};

export default function CardDeck({ onSelectFilter }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);
  const timerRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchDeltaXRef = useRef(0);

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const changeCard = useCallback((direction = 1) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + direction + CARDS_DATA.length) % CARDS_DATA.length);
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 300);
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      changeCard(1);
    }, 5000);
  }, [changeCard, stopAutoPlay]);

  const resetAutoPlay = useCallback(() => {
    stopAutoPlay();
    startAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  const goToCard = (index) => {
    if (isAnimatingRef.current || index === currentIndex) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 280);
    resetAutoPlay();
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  const activeData = CARDS_DATA[currentIndex];

  const handleTouchStart = (e) => {
    stopAutoPlay();
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (touchStartXRef.current === null) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    const deltaX = touchDeltaXRef.current;
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;

    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        changeCard(1); // Sola kaydırma -> sonraki kart
      } else {
        changeCard(-1); // Sağa kaydırma -> önceki kart
      }
    }
    resetAutoPlay();
  };

  const handleDeckClick = () => {
    changeCard(1);
    resetAutoPlay();
  };

  const handleRouteClick = (e) => {
    e.preventDefault();
    if (onSelectFilter && activeData.filter) {
      onSelectFilter(activeData.filter);
    }
    const elem = document.getElementById('rotalar');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="kesif" tabIndex={-1} className="px-3.5 sm:px-5 pt-2 pb-6 outline-none">
      {/* 3D Deste Kartları (Dokunma & Kaydırma Destekli - Genişletilmiş Format) */}
      <div
        className="card-spread-deck"
        title="Kaydırın veya sonraki kart için dokunun"
        onClick={handleDeckClick}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {CARDS_DATA.map((card, idx) => {
          const depth = (idx - currentIndex + CARDS_DATA.length) % CARDS_DATA.length;
          const isCurrent = depth === 0;
          const isSlidingOut = isCurrent && isAnimating;
          const IconComp = ICON_MAP[card.icon] || Mountain;

          return (
            <div
              key={card.id}
              data-depth={depth}
              className={`spread-card group ${isSlidingOut ? 'card-slide-out' : ''}`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 flex flex-col justify-between p-4 sm:p-5">
                <div className="flex items-center justify-between text-white">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono-tech font-bold uppercase tracking-wider shadow-sm border border-white/10">
                    {card.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <IconComp className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono-tech font-bold text-accent uppercase tracking-wider">
                    {card.tag}
                  </div>
                  <h3 className="font-headline font-black text-white text-[19px] leading-tight mt-1">
                    {card.title}
                  </h3>
                  <div className="text-[10px] text-white/90 font-mono-tech mt-2 flex items-center justify-between pt-2.5 border-t border-white/20">
                    <span className="font-semibold">{card.dist}</span>
                    <span className="text-accent underline font-bold tracking-wider flex items-center gap-1">
                      SEÇ &amp; İNCELE &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deste Sayfa / Nokta Göstergesi */}
      <div className="flex items-center justify-center gap-1.5 mb-3" aria-label="Deste İlerleme Göstergesi">
        {CARDS_DATA.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToCard(dotIdx);
            }}
            className={`transition-all duration-300 ${
              dotIdx === currentIndex
                ? 'w-6 h-1.5 rounded-full bg-accent'
                : 'w-1.5 h-1.5 rounded-full bg-black/20 hover:bg-black/40'
            }`}
            aria-label={`${dotIdx + 1}. Kart`}
          />
        ))}
      </div>

      {/* Etkileşimli Seçili Kart Bilgi Paneli (Focus Banner) */}
      <div className="p-4 rounded-2xl bg-white border border-light-outline-variant/80 shadow-sm transition-all duration-300">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-accent block mb-1">
              {activeData.badge}
            </span>
            <h3 className="font-headline font-extrabold text-ink text-[17px] leading-snug">
              {activeData.detailTitle}
            </h3>
            <p className="text-muted text-[12px] leading-relaxed mt-1">
              {activeData.desc}
            </p>
            <div className="text-[10px] font-mono-tech text-muted/80 mt-2 font-semibold">
              {activeData.meta}
            </div>
          </div>
          <button
            type="button"
            onClick={handleRouteClick}
            className="flex-shrink-0 self-center inline-flex items-center justify-center w-10 h-10 rounded-full bg-ink text-white hover:bg-accent active:scale-95 transition-all shadow-md"
            title="Rotaları İncele"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
