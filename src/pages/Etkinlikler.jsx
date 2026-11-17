import React, { useMemo, useState } from 'react';
import {
  CalendarDays,
  CalendarX,
  Clock,
  MapPin,
  List,
  Users,
  ChevronRight,
  Info,
  MessageCircle
} from 'lucide-react';
import { PACKAGES_DATA } from '../data/mockData';
import { openUrl, openWhatsApp } from '../lib/links';
import {
  getUpcomingEvents,
  getEventsOnDay,
  getNextEventAfter,
  isEventPast,
  dayKey,
  parseDayKey
} from '../lib/events';
import EventCalendar from '../components/EventCalendar';

const MONTHS = ['OCA', 'ŞUB', 'MAR', 'NİS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKİ', 'KAS', 'ARA'];
const MONTHS_FULL = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];
const MONTHS_FULL_UPPER = [
  'OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN',
  'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK'
];
const WEEKDAYS_UPPER = ['PAZAR', 'PAZARTESİ', 'SALI', 'ÇARŞAMBA', 'PERŞEMBE', 'CUMA', 'CUMARTESİ'];

function dateParts(event) {
  if (!event.startsAt) return null;
  const d = new Date(event.startsAt);
  return { day: String(d.getDate()).padStart(2, '0'), month: MONTHS[d.getMonth()] };
}

function SectionHeader({ icon: Icon, title, right }) {
  return (
    <div className="flex items-center justify-between mt-5 mb-2.5">
      <div className="flex items-center gap-1.5">
        <Icon className="w-[17px] h-[17px] text-accent" />
        <h2 className="font-headline text-[17px] font-black text-ink">{title}</h2>
      </div>
      {right ? <span className="text-[11px] font-extrabold tracking-wide text-accent">{right}</span> : null}
    </div>
  );
}

function ViewToggle({ value, onChange }) {
  const views = [
    { id: 'list', label: 'Liste', icon: List },
    { id: 'calendar', label: 'Takvim', icon: CalendarDays }
  ];
  return (
    <div className="flex p-1 rounded-2xl bg-sand-dark border border-light-outline-variant">
      {views.map(({ id, label, icon: Icon }) => {
        const active = id === value;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={active}
            aria-label={`${label} görünümü`}
            className={`flex items-center gap-1.5 px-3 h-9 rounded-xl text-[13px] font-extrabold cursor-pointer transition ${
              active ? 'bg-white text-ink shadow-sm' : 'text-ink-muted'
            }`}
          >
            <Icon className="w-[15px] h-[15px]" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function EventRow({ event, past = false }) {
  const parts = dateParts(event);
  return (
    <div className="p-3 rounded-2xl bg-white border border-light-outline-variant flex flex-col gap-3">
      <div className="flex gap-3">
        <div className="w-14 h-[62px] rounded-[14px] bg-forest flex flex-col items-center justify-center flex-shrink-0">
          <span className="text-[22px] leading-none font-black text-white">{parts?.day ?? '--'}</span>
          <span className="text-[11px] font-extrabold tracking-wider text-[#E8B07A] mt-0.5">{parts?.month ?? ''}</span>
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          {past ? (
            <span className="text-[10.5px] font-extrabold tracking-wider text-muted">TAMAMLANDI</span>
          ) : event.badge ? (
            <span className="text-[10.5px] font-extrabold tracking-wider text-accent">{event.badge}</span>
          ) : null}
          <h3 className="font-headline text-[15.5px] font-black text-ink leading-snug">{event.title}</h3>
          <div className="flex items-center gap-1 text-[12px] font-semibold text-ink-muted">
            <Clock className="w-[13px] h-[13px] text-muted" />
            <span>{event.time}</span>
            <MapPin className="w-[13px] h-[13px] text-muted ml-1.5" />
            <span className="truncate">{event.location}</span>
          </div>
          {event.quota && !past ? (
            <span className="text-[11.5px] font-extrabold text-forest">{event.quota}</span>
          ) : null}
        </div>
      </div>

      {past ? null : (
        <div className="flex gap-2">
          {event.calendarUrl ? (
            <button
              type="button"
              onClick={() => openUrl(event.calendarUrl)}
              aria-label={`${event.title} etkinliğini takvime ekle`}
              className="flex-1 h-[42px] rounded-xl bg-sand border border-light-outline-variant flex items-center justify-center gap-1.5 text-[13px] font-extrabold text-ink cursor-pointer active:scale-[0.98]"
            >
              <CalendarDays className="w-[15px] h-[15px]" />
              Takvime Ekle
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => openWhatsApp(`Merhaba, ${event.title} etkinliğine katılmak istiyorum.`)}
            aria-label={`${event.title} etkinliğine katıl`}
            className="flex-1 h-[42px] rounded-xl bg-forest flex items-center justify-center gap-1.5 text-[13px] font-extrabold text-white cursor-pointer active:scale-[0.98]"
          >
            <MessageCircle className="w-[15px] h-[15px]" />
            Katıl
          </button>
        </div>
      )}
    </div>
  );
}

function EmptyEvents() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-light-outline-variant">
      <div className="w-[46px] h-[46px] rounded-xl bg-forest flex items-center justify-center flex-shrink-0">
        <CalendarX className="w-[22px] h-[22px] text-[#E8B07A]" />
      </div>
      <div className="flex-1">
        <div className="font-headline text-[15px] font-black text-ink">Yeni etkinlikler yakında</div>
        <div className="text-[12.5px] text-ink-muted mt-0.5">Tarihler açılınca haber verelim.</div>
      </div>
      <button
        type="button"
        onClick={() => openWhatsApp('Merhaba, yeni etkinlik tarihlerinden haberdar olmak istiyorum.')}
        className="px-3 py-2.5 rounded-[10px] bg-forest text-white text-[12px] font-extrabold cursor-pointer"
      >
        Haber Ver
      </button>
    </div>
  );
}

// Takvim görünümü: ay ızgarası + seçili günün etkinlikleri.
function CalendarSection() {
  const todayKey = useMemo(() => dayKey(new Date()), []);
  const [selectedKey, setSelectedKey] = useState(() => {
    const next = getUpcomingEvents()[0];
    return next?.startsAt ? dayKey(next.startsAt) : todayKey;
  });

  const dayEvents = useMemo(() => getEventsOnDay(selectedKey), [selectedKey]);
  const nextEvent = useMemo(() => getNextEventAfter(selectedKey), [selectedKey]);
  const selected = parseDayKey(selectedKey);
  const dayLabel =
    `${selected.getDate()} ${MONTHS_FULL_UPPER[selected.getMonth()]} · ${WEEKDAYS_UPPER[selected.getDay()]}` +
    (selectedKey === todayKey ? ' · BUGÜN' : '');
  const nextDate = nextEvent ? new Date(nextEvent.startsAt) : null;

  return (
    <div className="mt-4">
      <EventCalendar selectedKey={selectedKey} todayKey={todayKey} onSelect={setSelectedKey} />

      <div className="flex items-center justify-between mt-4 mb-2.5">
        <h2 className="font-headline text-[13px] font-black tracking-wide text-ink">{dayLabel}</h2>
        {dayEvents.length ? (
          <span className="text-[11px] font-extrabold tracking-wide text-accent">{dayEvents.length} ETKİNLİK</span>
        ) : null}
      </div>

      <div className="flex flex-col gap-2.5">
        {dayEvents.length ? (
          dayEvents.map((event) => <EventRow key={event.id} event={event} past={isEventPast(event)} />)
        ) : (
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-light-outline-variant">
            <div className="w-[46px] h-[46px] rounded-xl bg-forest flex items-center justify-center flex-shrink-0">
              <CalendarX className="w-[22px] h-[22px] text-[#E8B07A]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-headline text-[15px] font-black text-ink">Bu tarihte etkinlik yok</div>
              <div className="text-[12.5px] text-ink-muted mt-0.5 line-clamp-2">
                {nextEvent
                  ? `Sıradaki: ${nextDate.getDate()} ${MONTHS_FULL[nextDate.getMonth()]} · ${nextEvent.title}`
                  : 'Yeni tarihler açılınca burada görünecek.'}
              </div>
            </div>
            {nextEvent ? (
              <button
                type="button"
                onClick={() => setSelectedKey(dayKey(nextEvent.startsAt))}
                aria-label={`Sıradaki etkinliğe git: ${nextEvent.title}`}
                className="px-3 py-2.5 rounded-[10px] bg-forest text-white text-[12px] font-extrabold cursor-pointer"
              >
                Sıradaki
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

function ProgramRow({ pkg }) {
  return (
    <button
      type="button"
      onClick={() => openWhatsApp(`Merhaba, ${pkg.title} programı için rezervasyon ve bilgi almak istiyorum.`)}
      aria-label={`${pkg.title}, ${pkg.price}, rezervasyon yap`}
      className="flex gap-3 p-2.5 rounded-2xl bg-white border border-light-outline-variant text-left cursor-pointer active:scale-[0.99] transition"
    >
      <img src={pkg.image} alt="" className="w-[92px] h-[112px] rounded-xl object-cover flex-shrink-0" loading="lazy" />
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <span className="text-[10.5px] font-extrabold tracking-wider text-accent">{pkg.badge}</span>
        <h3 className="font-headline text-[15px] font-black text-ink leading-snug">{pkg.title}</h3>
        <p className="text-[12.5px] leading-[17px] text-ink-muted line-clamp-2">{pkg.desc}</p>
        <div className="mt-auto pt-1.5 flex items-center justify-between">
          <span className="text-[16px] font-black text-ink">
            <span className="text-[10.5px] font-extrabold text-muted">{pkg.priceLabel} </span>
            {pkg.price}
          </span>
          <span className="flex items-center gap-0.5 text-[12.5px] font-extrabold text-accent">
            Rezervasyon
            <ChevronRight className="w-[13px] h-[13px]" />
          </span>
        </div>
      </div>
    </button>
  );
}

export default function Etkinlikler() {
  const upcomingEvents = useMemo(() => getUpcomingEvents(), []);
  const year = new Date().getFullYear();
  const [view, setView] = useState('calendar');

  return (
    <section className="px-4 pt-2 pb-5 bg-sand-light min-h-[70vh]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="font-headline text-[26px] font-black text-ink">Etkinlikler</h1>
          <p className="text-[13px] text-ink-muted mt-0.5">Kulüp takvimi ve {year} sezonu programları</p>
        </div>
        <ViewToggle value={view} onChange={setView} />
      </div>

      {view === 'calendar' ? (
        <CalendarSection />
      ) : (
        <>
          <SectionHeader
            icon={CalendarDays}
            title="Yaklaşan"
            right={upcomingEvents.length ? `${upcomingEvents.length} ETKİNLİK` : null}
          />
          <div className="flex flex-col gap-2.5">
            {upcomingEvents.length === 0 ? (
              <EmptyEvents />
            ) : (
              upcomingEvents.map((event) => <EventRow key={event.id} event={event} />)
            )}
          </div>
        </>
      )}

      <SectionHeader icon={Users} title="Kulüp Programları" right="GRUP & AİLE" />
      <div className="flex flex-col gap-2.5">
        {PACKAGES_DATA.map((pkg) => (
          <ProgramRow key={pkg.id} pkg={pkg} />
        ))}
      </div>

      <div className="flex items-start gap-2 mt-[18px] p-3 rounded-xl bg-forest/[0.06] border border-forest/15">
        <Info className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
        <p className="text-[12.5px] leading-[18px] font-semibold text-forest">
          Kayıt ve rezervasyonlar şimdilik WhatsApp üzerinden alınıyor. Kontenjan dolmadan yazmayı unutma.
        </p>
      </div>
    </section>
  );
}
