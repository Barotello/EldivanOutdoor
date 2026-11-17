import React, { useState } from 'react';
import { X, Phone, Crosshair, RefreshCw, Share2, MessageCircle, SquareCheckBig, CircleCheck, Loader2 } from 'lucide-react';
import { useNavigate } from '../lib/router';
import { openUrl, openWhatsApp } from '../lib/links';

const CHECKLIST = [
  'Rotanı ve dönüş saatini bir yakınına ya da kulübe bildir.',
  'Telefonunu tam şarj et, yanına powerbank al.',
  'Hava durumunu kontrol et; gün batımından önce dönmeyi planla.',
  'En az 1,5 L su, katmanlı giysi ve kafa feneri bulundur.',
  'Kaybolursan olduğun yerde kal, enerjini ve şarjını koru.'
];

const mapsLink = (c) => `https://maps.google.com/?q=${c.latitude.toFixed(5)},${c.longitude.toFixed(5)}`;

const buildMessage = (c) =>
  `Eldivan Outdoor – konumum:\n${mapsLink(c)}\n` +
  `Koordinat: ${c.latitude.toFixed(5)}, ${c.longitude.toFixed(5)}` +
  (c.accuracy ? ` (±${Math.round(c.accuracy)} m)` : '');

export default function Guvenlik() {
  const navigate = useNavigate();
  const [loc, setLoc] = useState({ status: 'idle', coords: null, message: null });

  const getLocation = () =>
    new Promise((resolve) => {
      if (!('geolocation' in navigator)) {
        setLoc({ status: 'error', coords: null, message: 'Bu tarayıcı konum özelliğini desteklemiyor.' });
        resolve(null);
        return;
      }
      setLoc({ status: 'loading', coords: null, message: null });
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLoc({ status: 'ready', coords: pos.coords, message: null });
          resolve(pos.coords);
        },
        (err) => {
          setLoc({
            status: 'error',
            coords: null,
            message:
              err.code === 1
                ? 'Konum izni verilmedi. Tarayıcı ayarlarından izin verip tekrar dene.'
                : 'Konum alınamadı. GPS açık mı? Açık alanda tekrar dene.'
          });
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });

  const shareLocation = async () => {
    const coords = loc.coords ?? (await getLocation());
    if (!coords) return;
    const text = buildMessage(coords);
    try {
      if (navigator.share) await navigator.share({ text });
      else {
        await navigator.clipboard.writeText(text);
        setLoc((prev) => ({ ...prev, message: 'Konum panoya kopyalandı.' }));
      }
    } catch {
      // Paylaşım iptal edildi
    }
  };

  const sendToClub = async () => {
    const coords = loc.coords ?? (await getLocation());
    if (!coords) return;
    openWhatsApp(`ACİL / YARDIM: ${buildMessage(coords)}`);
  };

  return (
    <div className="min-h-screen bg-sand-light pt-[max(0px,env(safe-area-inset-top))] pb-8">
      <div className="flex items-center justify-between px-[18px] py-3">
        <h1 className="font-headline text-[22px] font-black text-ink">Güvenlik &amp; SOS</h1>
        <button
          type="button"
          onClick={() => navigate.back()}
          aria-label="Kapat"
          className="w-9 h-9 rounded-full bg-sand-dark flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-[18px] flex flex-col gap-3.5">
        <button
          type="button"
          onClick={() => openUrl('tel:112')}
          aria-label="112 acil çağrı merkezini ara"
          className="flex items-center gap-4 p-5 rounded-[20px] bg-[#B3261E] text-left cursor-pointer active:scale-[0.99]"
        >
          <Phone className="w-[30px] h-[30px] text-white flex-shrink-0" />
          <span className="flex-1">
            <span className="block font-headline text-[24px] font-black text-white">112'yi Ara</span>
            <span className="block text-[12.5px] font-bold text-white/90 mt-0.5">
              Ambulans, jandarma (JAK), itfaiye, AFAD
            </span>
          </span>
        </button>

        <div className="p-4 rounded-[18px] bg-white border border-light-outline-variant flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Crosshair className="w-[18px] h-[18px] text-forest" />
            <h2 className="font-headline text-[16px] font-black text-ink">Konumum</h2>
          </div>

          {loc.status === 'loading' && (
            <div className="flex items-center gap-2 text-[13px] text-ink-muted">
              <Loader2 className="w-4 h-4 animate-spin text-accent" />
              Konum alınıyor…
            </div>
          )}
          {loc.status === 'error' && <p className="text-[13px] font-bold text-[#8C1D18]">{loc.message}</p>}
          {loc.status === 'ready' && loc.coords && (
            <div className="p-3 rounded-xl bg-sand">
              <div className="text-[18px] font-black text-ink select-text">
                {loc.coords.latitude.toFixed(5)}, {loc.coords.longitude.toFixed(5)}
              </div>
              <div className="text-[13px] text-ink-muted mt-0.5">
                Doğruluk: ±{Math.round(loc.coords.accuracy ?? 0)} m
                {loc.coords.altitude != null ? ` · Rakım: ${Math.round(loc.coords.altitude)} m` : ''}
              </div>
              {loc.message ? <div className="text-[12.5px] font-bold text-forest mt-1">{loc.message}</div> : null}
            </div>
          )}
          {loc.status === 'idle' && (
            <p className="text-[13px] leading-[19px] text-ink-muted">
              Konumunu alıp kurtarma ekipleriyle ya da kulüple paylaşabilirsin.
            </p>
          )}

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={getLocation}
              className="flex-1 h-11 rounded-xl bg-sand-dark border border-light-outline-variant flex items-center justify-center gap-1.5 text-[13px] font-extrabold text-ink cursor-pointer"
            >
              <RefreshCw className="w-[15px] h-[15px]" />
              {loc.status === 'ready' ? 'Yenile' : 'Konumu Al'}
            </button>
            <button
              type="button"
              onClick={shareLocation}
              className="flex-1 h-11 rounded-xl bg-sand-dark border border-light-outline-variant flex items-center justify-center gap-1.5 text-[13px] font-extrabold text-ink cursor-pointer"
            >
              <Share2 className="w-[15px] h-[15px]" />
              Paylaş
            </button>
          </div>
          <button
            type="button"
            onClick={sendToClub}
            className="h-[46px] rounded-xl bg-[#1F7A42] flex items-center justify-center gap-2 text-[14px] font-extrabold text-white cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            Konumu Kulübe Gönder
          </button>
        </div>

        <div className="p-4 rounded-[18px] bg-white border border-light-outline-variant flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <SquareCheckBig className="w-[18px] h-[18px] text-forest" />
            <h2 className="font-headline text-[16px] font-black text-ink">Rotaya Çıkmadan Önce</h2>
          </div>
          {CHECKLIST.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <CircleCheck className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
              <span className="text-[13.5px] leading-[19px] text-ink">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
