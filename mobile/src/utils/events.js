import { EVENTS_DATA } from '../data/mockData';

// startsAt geçmişte kalan etkinlikleri ayıklar, yaklaşanları tarihe göre sıralar.
export function getUpcomingEvents(now = new Date()) {
  return EVENTS_DATA.filter((e) => !e.startsAt || new Date(e.startsAt) >= now).sort(
    (a, b) => new Date(a.startsAt || 0) - new Date(b.startsAt || 0)
  );
}

const pad = (n) => String(n).padStart(2, '0');

// Takvim için yerel saatle "YYYY-AA-GG" anahtarı; metin olarak karşılaştırılabilir.
export function dayKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function parseDayKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

// Etkinliğin kapsadığı günler; endsAt yoksa tek günlük sayılır.
export function eventDayRange(event) {
  if (!event.startsAt) return null;
  const start = dayKey(event.startsAt);
  const end = event.endsAt ? dayKey(event.endsAt) : start;
  return { start, end: end < start ? start : end };
}

const byStart = (a, b) => new Date(a.startsAt) - new Date(b.startsAt);

export function getEventsOnDay(key) {
  return EVENTS_DATA.filter((e) => {
    const range = eventDayRange(e);
    return range && range.start <= key && key <= range.end;
  }).sort(byStart);
}

// Verilen günden sonra başlayan ilk etkinlik.
export function getNextEventAfter(key) {
  return EVENTS_DATA.filter((e) => {
    const range = eventDayRange(e);
    return range && range.start > key;
  }).sort(byStart)[0];
}

export function isEventPast(event, now = new Date()) {
  const last = event.endsAt || event.startsAt;
  return !!last && new Date(last) < now;
}
