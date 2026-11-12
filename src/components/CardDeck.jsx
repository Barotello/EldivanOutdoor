import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mountain, Bike, Tent, Activity, Compass, MapPin } from 'lucide-react';
import { CARDS_DATA } from '../data/mockData';

const ICON_MAP = {
  Mountain: Mountain,
  Bike: Bike,
  Tent: Tent,
  Activity: Activity,
  Compass: Compass,
  MapPin: MapPin
};

export default function CardDeck({ onSelectFilter }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      advanceCard();
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetAutoPlay = () => {
    stopAutoPlay();
    startAutoPlay();
  };

  const advanceCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % CARDS_DATA.length);
      setIsAnimating(false);
    }, 320);
  };

  const goToCard = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 280);
    resetAutoPlay();
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const activeData = CARDS_DATA[currentIndex];

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
    <section id="kesif" className="px-5 pt-5 pb-6">
      {/* Başlık ve Koordinatlar */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h1 className="font-headline text-[28px] font-extrabold tracking-tight text-ink leading-[1.15]">
            Doğanın <br />
            <span className="text-muted font-normal">merkezinde.</span>
          </h1>
        </div>

        <div className="text-right font-mono-tech">
          <div className="inline-flex items-center justify-end text-accent text-xs font-bold leading-none mb-1">
            <span className="text-accent text-sm mr-0.5">+</span>
            <span className="text-[11px] text-ink font-semibold">40.6034° K</span>
          </div>
          <div className="text-[11px] text-muted font-medium leading-none">33.5140° D</div>
          <div className="text-[10px] text-muted/80 uppercase tracking-wider mt-1">RAKIM 1.420M</div>
        </div>
      </div>

      {/* 3D Deste Kartları */}
      <div
        className="card-spread-deck"
        title="Sonraki kart için dokunun"
        onClick={() => {
          advanceCard();
          resetAutoPlay();
        }}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
        onTouchStart={stopAutoPlay}
        onTouchEnd={resetAutoPlay}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 flex flex-col justify-between p-3.5">
                <div className="flex items-center justify-between text-white">
                  <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[9px] font-mono-tech font-bold uppercase tracking-wider">
                    {card.badge}
                  </span>
                  <IconComp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-mono-tech font-bold text-accent uppercase tracking-wider">
                    {card.tag}
                  </div>
                  <h3 className="font-headline font-extrabold text-white text-[16px] leading-tight mt-0.5">
                    {card.title}
                  </h3>
                  <div className="text-[9px] text-white/80 font-mono-tech mt-1 flex items-center justify-between">
                    <span>{card.dist}</span>
                    <span className="text-accent underline font-bold">SEÇ &rarr;</span>
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
