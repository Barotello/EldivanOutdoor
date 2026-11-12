import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const SPLASH_STORAGE_KEY = 'eldivan_splash_seen_v1';
const MUD_COLORS = ['#4A3322', '#3E2A1C', '#57402B', '#35241A'];

export default function Splash({ replayTrigger = 0, onFinish }) {
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem(SPLASH_STORAGE_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  const sceneRef = useRef(null);
  const roadCanvasRef = useRef(null);
  const mudCanvasRef = useRef(null);
  const bikeRef = useRef(null);
  const rafRef = useRef(null);
  const bikeAnimRef = useRef(null);
  const failsafeTimerRef = useRef(null);

  useEffect(() => {
    const isReplay = replayTrigger > 0;

    if (!isReplay) {
      let hasSeen = false;
      try {
        hasSeen = sessionStorage.getItem(SPLASH_STORAGE_KEY) === 'true';
      } catch {
        hasSeen = false;
      }

      if (hasSeen) {
        setVisible(false);
        onFinish?.();
        return;
      }

      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        try {
          sessionStorage.setItem(SPLASH_STORAGE_KEY, 'true');
        } catch {}
        setVisible(false);
        onFinish?.();
        return;
      }
    } else {
      setVisible(true);
    }

    const road = roadCanvasRef.current;
    const mud = mudCanvasRef.current;
    const bike = bikeRef.current;
    const scene = sceneRef.current;
    if (!road || !mud || !bike) return;

    const rc = road.getContext('2d');
    const mc = mud.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let hills = [];
    let splats = [];
    let off = 0;
    let burst = false;
    let isFinished = false;

    const rnd = (a, b) => a + Math.random() * (b - a);
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

    const fit = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      [road, mud].forEach((c) => {
        if (!c) return;
        c.width = W * dpr;
        c.height = H * dpr;
        c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
      });
      hills = [];
      for (let i = 0; i <= 14; i++) {
        hills.push(rnd(0.03, 0.12));
      }
    };

    const drawRoad = (t, dt) => {
      const hz = H * 0.45;
      const sp = ((5 + t / 380) * dt) / 1000;
      off += sp;

      // Gökyüzü
      rc.fillStyle = '#2A4A39';
      rc.fillRect(0, 0, W, hz);

      // Güneş
      rc.fillStyle = '#E8B07A';
      rc.beginPath();
      rc.arc(W * 0.72, hz - H * 0.13, W * 0.09, 0, Math.PI * 2);
      rc.fill();

      // Eldivan Dağ Silüeti
      rc.fillStyle = '#1A3226';
      rc.beginPath();
      rc.moveTo(0, hz);
      for (let i = 0; i <= 14; i++) {
        rc.lineTo((W * i) / 14, hz - H * hills[i]);
      }
      rc.lineTo(W, hz);
      rc.closePath();
      rc.fill();

      // Perspektif Toprak Parkur
      for (let y = hz; y < H; y += 3) {
        const p = (y - hz) / (H - hz);
        const z = 1 / (p + 0.03);
        const b = Math.floor(z * 1.6 - off) & 1;

        rc.fillStyle = b ? '#2F5A3E' : '#2A5237';
        rc.fillRect(0, y, W, 3);

        const rw = W * (0.1 + 0.95 * p);
        rc.fillStyle = b ? '#5A4230' : '#4F392A';
        rc.fillRect(W / 2 - rw / 2, y, rw, 3);

        rc.fillStyle = '#3A291D';
        rc.fillRect(W / 2 - rw * 0.26, y, rw * 0.1, 3);
        rc.fillRect(W / 2 + rw * 0.16, y, rw * 0.1, 3);
      }
    };

    const makeBurst = () => {
      const x0 = W / 2;
      const y0 = H * 0.62;
      for (let i = 0; i < 130; i++) {
        const big = i < 40;
        const sat = [];
        for (let k = 0; k < 4; k++) {
          sat.push([rnd(0, Math.PI * 2), rnd(0.9, 1.5), rnd(0.15, 0.35)]);
        }
        splats.push({
          x0,
          y0,
          tx: W / 2 + gauss() * W * 0.46,
          ty: H * 0.5 + gauss() * H * 0.4,
          r: big ? rnd(60, 150) : rnd(8, 55),
          t: 2350 + rnd(0, 260),
          dur: rnd(260, 420),
          c: MUD_COLORS[i % 4],
          dl: rnd(0, 500),
          dv: rnd(0.5, 1.5),
          sat
        });
      }

      if (scene?.animate) {
        scene.animate(
          [
            { transform: 'translate(0,0)' },
            { transform: 'translate(-12px,8px)' },
            { transform: 'translate(10px,-9px)' },
            { transform: 'translate(-7px,6px)' },
            { transform: 'translate(0,0)' }
          ],
          { duration: 480 }
        );
      }

      try {
        navigator.vibrate?.(70);
      } catch {}
    };

    const drawMud = (t) => {
      mc.clearRect(0, 0, W, H);
      for (let n = 0; n < splats.length; n++) {
        const s = splats[n];
        if (t < s.t) continue;
        const p = Math.min(1, (t - s.t) / s.dur);
        const e = 1 - Math.pow(1 - p, 3);
        const x = s.x0 + (s.tx - s.x0) * e;
        const y = s.y0 + (s.ty - s.y0) * e;
        const r = s.r * (0.15 + 0.85 * e);
        let a = 1;
        let dy = 0;
        const d = (t - 3300 - s.dl) / 1000;
        if (d > 0) {
          dy = d * d * 520 * s.dv;
          a = 1 - Math.min(1, Math.max(0, (t - 3600 - s.dl) / 1300));
        }
        if (a <= 0) continue;

        mc.globalAlpha = a;
        mc.fillStyle = s.c;
        mc.strokeStyle = s.c;
        if (dy > 0) {
          mc.lineWidth = r * 0.5;
          mc.lineCap = 'round';
          mc.beginPath();
          mc.moveTo(x, y);
          mc.lineTo(x, y + dy);
          mc.stroke();
        }
        mc.beginPath();
        mc.arc(x, y + dy, r, 0, Math.PI * 2);
        mc.fill();

        for (let k = 0; k < s.sat.length; k++) {
          const o = s.sat[k];
          mc.beginPath();
          mc.arc(x + Math.cos(o[0]) * r * o[1], y + dy + Math.sin(o[0]) * r * o[1], r * o[2], 0, Math.PI * 2);
          mc.fill();
        }

        mc.globalAlpha = a * 0.2;
        mc.fillStyle = '#fff';
        mc.beginPath();
        mc.arc(x - r * 0.3, y + dy - r * 0.3, r * 0.25, 0, Math.PI * 2);
        mc.fill();
      }
      mc.globalAlpha = 1;
    };

    const complete = () => {
      if (isFinished) return;
      isFinished = true;
      cancelAnimationFrame(rafRef.current);
      bikeAnimRef.current?.cancel();
      clearTimeout(failsafeTimerRef.current);
      try {
        sessionStorage.setItem(SPLASH_STORAGE_KEY, 'true');
      } catch {}
      document.body.style.overflow = '';
      setVisible(false);
      onFinish?.();
    };

    document.body.style.overflow = 'hidden';
    fit();

    const hz = H * 0.45;
    bike.style.top = `${hz - 252}px`;
    const s1 = (H * 0.95) / 260;
    const s2 = (H * 2) / 260;
    const ez = 'cubic-bezier(.5,0,.9,.8)';

    if (bike.animate) {
      bikeAnimRef.current = bike.animate(
        [
          { transform: 'translateY(0px) scale(.05)', opacity: 1, offset: 0, easing: ez },
          { transform: `translateY(${H * 0.05}px) scale(${s1 * 0.35})`, opacity: 1, offset: 0.5, easing: ez },
          { transform: `translateY(${H * 0.4}px) scale(${s1})`, opacity: 1, offset: 0.82, easing: 'ease-in' },
          { transform: `translateY(${H * 0.75}px) scale(${s2})`, opacity: 0, offset: 1 }
        ],
        { duration: 2900, easing: 'linear', fill: 'forwards' }
      );
    }

    const t0 = performance.now();
    let last = t0;

    const tick = (now) => {
      if (isFinished) return;
      const t = now - t0;
      const dt = Math.min(50, now - last);
      last = now;

      drawRoad(t, dt);
      if (!burst && t > 2350) {
        burst = true;
        makeBurst();
      }
      drawMud(t);

      if (t > 3800) {
        complete();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    failsafeTimerRef.current = setTimeout(complete, 4200);

    const handleResize = () => {
      if (!isFinished) fit();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      bikeAnimRef.current?.cancel();
      clearTimeout(failsafeTimerRef.current);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [replayTrigger]);

  if (!visible) return null;

  const handleSkip = () => {
    try {
      sessionStorage.setItem(SPLASH_STORAGE_KEY, 'true');
    } catch {}
    document.body.style.overflow = '';
    setVisible(false);
    onFinish?.();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Eldivan Outdoor Açılış Animasyonu"
      className="fixed inset-0 z-[9999] bg-[#1F3A2E] overflow-hidden select-none"
    >
      <div ref={sceneRef} className="absolute inset-0 z-10">
        <canvas ref={roadCanvasRef} className="absolute inset-0 w-full h-full block" />
        <div
          ref={bikeRef}
          className="absolute left-1/2 -ml-[100px] w-[200px] h-[260px] origin-bottom z-20 will-change-transform"
          style={{ transform: 'translateY(0) scale(.05)' }}
        >
          <svg
            viewBox="0 0 200 260"
            width="200"
            height="260"
            aria-hidden="true"
            className="block origin-bottom splash-bike-wobble"
          >
            <ellipse cx="100" cy="256" rx="48" ry="5" fill="#000" opacity=".35" />
            <rect x="87" y="168" width="26" height="88" rx="10" fill="#15130F" />
            <line
              className="splash-knob-spin"
              x1="92"
              y1="172"
              x2="92"
              y2="254"
              stroke="#7A7566"
              strokeWidth="3"
              strokeDasharray="6 5"
            />
            <line
              className="splash-knob-spin"
              x1="100"
              y1="172"
              x2="100"
              y2="254"
              stroke="#7A7566"
              strokeWidth="3"
              strokeDasharray="6 5"
            />
            <line
              className="splash-knob-spin"
              x1="108"
              y1="172"
              x2="108"
              y2="254"
              stroke="#7A7566"
              strokeWidth="3"
              strokeDasharray="6 5"
            />
            <rect x="90" y="138" width="5" height="82" fill="#B9B6AA" />
            <rect x="105" y="138" width="5" height="82" fill="#B9B6AA" />
            <path d="M83 180 Q100 148 117 180 L112 186 Q100 164 88 186 Z" fill="#B8420F" />
            <path d="M72 118 L60 192 L76 195 L90 135 Z" fill="#14201A" />
            <path d="M128 118 L140 192 L124 195 L110 135 Z" fill="#14201A" />
            <path d="M68 70 Q100 58 132 70 L122 140 L78 140 Z" fill="#D9531E" />
            <path d="M72 78 L34 108" stroke="#D9531E" strokeWidth="13" strokeLinecap="round" />
            <path d="M128 78 L166 108" stroke="#D9531E" strokeWidth="13" strokeLinecap="round" />
            <line x1="20" y1="108" x2="180" y2="108" stroke="#1B1B18" strokeWidth="5" strokeLinecap="round" />
            <rect x="12" y="101" width="22" height="14" rx="6" fill="#0E0E0C" />
            <rect x="166" y="101" width="22" height="14" rx="6" fill="#0E0E0C" />
            <rect x="78" y="112" width="44" height="36" rx="8" fill="#F5F2EA" />
            <text
              x="100"
              y="138"
              textAnchor="middle"
              fontFamily="'Space Grotesk', sans-serif"
              fontWeight="700"
              fontSize="20"
              fill="#1B1B18"
            >
              EO
            </text>
            <circle cx="100" cy="42" r="22" fill="#F5F2EA" />
            <rect x="82" y="38" width="36" height="15" rx="6" fill="#14201A" />
            <path d="M80 34 Q100 22 120 34 L124 30 Q100 12 76 30 Z" fill="#B8420F" />
          </svg>
        </div>
      </div>

      <canvas ref={mudCanvasRef} className="absolute inset-0 w-full h-full z-30 pointer-events-none" />

      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 z-40 px-4 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white font-mono-tech text-xs font-bold flex items-center gap-1.5 hover:bg-black/70 active:scale-95 transition-all"
      >
        <span>Geç</span>
        <ArrowRight className="w-3.5 h-3.5 text-accent" />
      </button>
    </div>
  );
}
