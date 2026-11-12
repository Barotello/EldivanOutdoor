import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Splash({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const roadCanvasRef = useRef(null);
  const mudCanvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    // SessionStorage kontrolü (oturum başına yalnızca 1 kez oynasın)
    const hasShown = sessionStorage.getItem('eldivan_splash_seen');
    if (hasShown) {
      setVisible(false);
      onFinish?.();
      return;
    }

    const roadCanvas = roadCanvasRef.current;
    const mudCanvas = mudCanvasRef.current;
    if (!roadCanvas || !mudCanvas) return;

    const roadCtx = roadCanvas.getContext('2d');
    const mudCtx = mudCanvas.getContext('2d');

    const resize = () => {
      roadCanvas.width = window.innerWidth;
      roadCanvas.height = window.innerHeight;
      mudCanvas.width = window.innerWidth;
      mudCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Basit ve zarif çamur/yol parçacıkları
    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 8 + 4
      });
    }

    let isDone = false;
    const complete = () => {
      if (isDone) return;
      isDone = true;
      sessionStorage.setItem('eldivan_splash_seen', 'true');
      setVisible(false);
      onFinish?.();
    };

    // 3.5 saniye sonra otomatik kapanış
    const timer = setTimeout(complete, 3500);

    const render = () => {
      if (isDone) return;
      roadCtx.fillStyle = '#14201A';
      roadCtx.fillRect(0, 0, roadCanvas.width, roadCanvas.height);

      // Yol çizgileri
      roadCtx.fillStyle = '#F5F2EA';
      particles.forEach((p) => {
        p.y += p.speed;
        if (p.y > window.innerHeight) {
          p.y = 0;
          p.x = Math.random() * window.innerWidth;
        }
        roadCtx.beginPath();
        roadCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        roadCtx.fillStyle = 'rgba(245, 242, 234, 0.25)';
        roadCtx.fill();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#14201A] flex flex-col items-center justify-center select-none overflow-hidden transition-opacity duration-500">
      <canvas ref={roadCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <canvas ref={mudCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Bisiklet & Marka İllüstrasyonu */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-forest border-2 border-white/20 p-2 shadow-2xl flex items-center justify-center animate-bounce">
          <img src="/images/app-icon.png" alt="Eldivan Outdoor" className="w-full h-full rounded-full object-cover" />
        </div>
        <h1 className="font-headline font-black text-2xl tracking-tight text-white mt-4 flex items-center gap-1">
          ELDIVAN <span className="text-white">OUTDOOR</span>
          <span className="text-accent text-3xl leading-none">.</span>
        </h1>
        <p className="font-mono-tech text-[11px] font-semibold tracking-wider text-muted mt-1 uppercase">
          Doğa ve Motor Sporları Kulübü
        </p>
      </div>

      {/* Atla Butonu */}
      <button
        onClick={() => {
          sessionStorage.setItem('eldivan_splash_seen', 'true');
          setVisible(false);
          onFinish?.();
        }}
        className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-mono-tech text-xs font-bold flex items-center gap-1.5 hover:bg-black/70 active:scale-95 transition-all"
      >
        <span>Geç</span>
        <ArrowRight className="w-3.5 h-3.5 text-accent" />
      </button>
    </div>
  );
}
