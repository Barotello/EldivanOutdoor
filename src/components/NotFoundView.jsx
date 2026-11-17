import React from 'react';
import { Signpost } from 'lucide-react';
import { useNavigate } from '../lib/router';

export default function NotFoundView() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-2.5 p-6 bg-sand-light">
      <Signpost className="w-[42px] h-[42px] text-accent" />
      <h1 className="font-headline text-[20px] font-black text-ink">Bu patika bulunamadı</h1>
      <p className="text-[14px] text-ink-muted">Aradığın sayfa kaldırılmış ya da adresi değişmiş olabilir.</p>
      <button
        type="button"
        onClick={() => navigate('/', { replace: true })}
        className="mt-2 px-5 py-3 rounded-full bg-forest text-white font-extrabold cursor-pointer"
      >
        Ana sayfaya dön
      </button>
    </div>
  );
}
