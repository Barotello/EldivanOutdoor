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

  // Seç ve İncele Aksiyonu: Filtreyi seçer ve Rotalar alanına pürüzsüz kaydırır
  const handleSelectAndInspect = (targetCard) => {
    const cardToSelect = targetCard || activeData;
    if (onSelectFilter && cardToSelect?.filter) {
      onSelectFilter(cardToSelect.filter);
    }
    const elem = document.getElementById('rotalar');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      elem.focus({ preventScroll: true });
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
                <div className="flex items-center justify-end text-white">
                  <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-sm">
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

                    {/* İşlevsel Seç ve İncele Butonu */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAndInspect(card);
                      }}
                      className="text-accent hover:text-white underline font-bold tracking-wider flex items-center gap-1 transition-all cursor-pointer py-1 px-2 -mr-1 rounded-md hover:bg-white/10 active:scale-95"
                      title={`${card.title} rotasını seç ve incele`}
                    >
                      <span>SEÇ &amp; İNCELE</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enduro Parkur İlerleme Çizgisi & İlerleyen Motor Simgesi */}
      <div className="w-full max-w-[280px] mx-auto px-4 my-3.5 select-none" aria-label="Deste İlerleme Göstergesi">
        <div className="relative h-8 flex items-center justify-between">
          {/* Zemin Düz Çizgisi */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] bg-black/10 rounded-full" />

          {/* İlerleme Çizgisi (Geçilen Yol) */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentIndex / (CARDS_DATA.length - 1)) * 100}%` }}
          />

          {/* İstasyon Noktaları (Tıklanabilir Duraklar) */}
          {CARDS_DATA.map((_, dotIdx) => {
            const isPassed = dotIdx <= currentIndex;
            const isCurrent = dotIdx === currentIndex;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToCard(dotIdx);
                }}
                className={`relative z-10 w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  isCurrent
                    ? 'bg-accent scale-125 ring-2 ring-accent/30'
                    : isPassed
                    ? 'bg-accent'
                    : 'bg-black/20 hover:bg-black/40'
                }`}
                title={`Kart ${dotIdx + 1}'e git`}
              />
            );
          })}

          {/* Çizgi Üstünde İlerleyen Motor İkonu */}
          <div
            className="absolute top-1/2 -translate-y-[65%] -translate-x-1/2 transition-all duration-500 ease-out pointer-events-none z-20"
            style={{
              left: `${(currentIndex / (CARDS_DATA.length - 1)) * 100}%`
            }}
          >
            <div className="relative drop-shadow-[0_2px_3px_rgba(0,0,0,0.28)] flex items-center justify-center">
              <img
                src="/images/moto-icon.png"
                alt="Enduro Motor"
                className="w-7 h-7 object-contain"
              />
              {/* Tekerlek temas/ışık vurgusu */}
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3.5 h-0.5 bg-accent/60 rounded-full blur-[0.5px]" />
            </div>
          </div>
        </div>

        {/* Alt Sayaç & Parkur Başlığı */}
        <div className="flex items-center justify-between text-[10px] font-mono-tech text-muted font-bold mt-1 px-0.5">
          <span className="uppercase text-accent tracking-wider">
            KEŞİF 0{currentIndex + 1} / 0{CARDS_DATA.length}
          </span>
          <span className="text-ink/75 font-semibold truncate max-w-[170px]">
            {activeData.title}
          </span>
        </div>
      </div>

      {/* Etkileşimli Seçili Kart Bilgi Paneli (Focus Banner - Tıklanabilir) */}
      <div
        onClick={() => handleSelectAndInspect(activeData)}
        className="p-4 rounded-2xl bg-white border border-light-outline-variant/80 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer active:scale-[0.99] group select-none"
        title="Bu rotayı seç ve incelemek için dokunun"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-accent block mb-1">
              {activeData.badge}
            </span>
            <h3 className="font-headline font-extrabold text-ink text-[17px] leading-snug group-hover:text-accent transition-colors">
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
            onClick={(e) => {
              e.stopPropagation();
              handleSelectAndInspect(activeData);
            }}
            className="flex-shrink-0 self-center inline-flex items-center justify-center w-10 h-10 rounded-full bg-ink text-white group-hover:bg-accent active:scale-95 transition-all shadow-md cursor-pointer"
            title="Rotaları İncele"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
