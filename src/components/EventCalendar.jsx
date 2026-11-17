import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EVENTS_DATA } from '../data/mockData';
import { eventDayRange, parseDayKey } from '../lib/events';

const MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];
const WEEKDAYS = ['PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CMT', 'PAZ'];
const WEEKDAY_NAMES = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

const pad = (n) => String(n).padStart(2, '0');

function monthOf(key) {
  const d = parseDayKey(key);
  return { year: d.getFullYear(), month: d.getMonth() };
}

const MARK_CLASS = {
  dot: 'left-1/2 -translate-x-1/2 w-1.5 rounded-full',
  start: 'left-1/2 right-0 rounded-l-full',
  middle: 'left-0 right-0',
  end: 'left-0 right-1/2 rounded-r-full'
};

// Ay görünümü: gün seçimi dışarıdan yönetilir, görünen ay içeride tutulur.
export default function EventCalendar({ selectedKey, todayKey, onSelect }) {
  const [visible, setVisible] = useState(() => monthOf(selectedKey));
  const { year, month } = visible;

  // Seçim başka bir aya taşınırsa (ör. "Sıradaki") o aya geç.
  useEffect(() => {
    setVisible(monthOf(selectedKey));
  }, [selectedKey]);

  const ranges = useMemo(() => EVENTS_DATA.map(eventDayRange).filter(Boolean), []);

  const { cells, monthCount } = useMemo(() => {
    const offset = (new Date(year, month, 1).getDay() + 6) % 7; // hafta Pazartesi başlar
    const dayCount = new Date(year, month + 1, 0).getDate();
    const total = Math.ceil((offset + dayCount) / 7) * 7;
    const prefix = `${year}-${pad(month + 1)}`;
    const list = [];
    for (let i = 0; i < total; i++) {
      const day = i - offset + 1;
      if (day < 1 || day > dayCount) {
        list.push({ id: `blank-${i}` });
        continue;
      }
      const key = `${prefix}-${pad(day)}`;
      const onDay = ranges.filter((r) => r.start <= key && key <= r.end);
      const range = onDay[0];
      let mark = null;
      if (range) {
        if (range.start === range.end) mark = 'dot';
        else if (key === range.start) mark = 'start';
        else if (key === range.end) mark = 'end';
        else mark = 'middle';
      }
      list.push({
        id: key,
        key,
        day,
        mark,
        count: onDay.length,
        weekday: WEEKDAY_NAMES[new Date(year, month, day).getDay()]
      });
    }
    const first = `${prefix}-01`;
    const last = `${prefix}-${pad(dayCount)}`;
    return {
      cells: list,
      monthCount: ranges.filter((r) => r.start <= last && r.end >= first).length
    };
  }, [year, month, ranges]);

  const shift = (delta) =>
    setVisible(({ year: y, month: m }) => {
      const d = new Date(y, m + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  return (
    <div className="rounded-2xl bg-white border border-light-outline-variant px-2.5 pt-2.5 pb-3">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => shift(-1)}
          aria-label="Önceki ay"
          className="w-11 h-11 rounded-xl bg-sand border border-light-outline-variant flex items-center justify-center cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-[18px] h-[18px]" />
        </button>
        <div className="flex-1 text-center">
          <div className="font-headline font-black text-[17px] text-ink">
            {MONTHS[month]} {year}
          </div>
          <div className="text-[11px] font-extrabold tracking-wide text-accent">
            {monthCount ? `${monthCount} ETKİNLİK` : 'ETKİNLİK YOK'}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setVisible(monthOf(todayKey));
            onSelect(todayKey);
          }}
          aria-label="Bugüne git"
          className="h-11 px-3 rounded-xl bg-white border border-light-outline-variant text-[13px] font-extrabold cursor-pointer active:scale-95"
        >
          Bugün
        </button>
        <button
          type="button"
          onClick={() => shift(1)}
          aria-label="Sonraki ay"
          className="w-11 h-11 rounded-xl bg-sand border border-light-outline-variant flex items-center justify-center cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-[18px] h-[18px]" />
        </button>
      </div>

      <div className="grid grid-cols-7 mt-3 mb-1">
        {WEEKDAYS.map((w, i) => (
          <div
            key={w}
            className={`text-center text-[11px] font-extrabold tracking-wide ${i > 4 ? 'text-accent' : 'text-muted'}`}
          >
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((cell) => {
          if (!cell.key) return <div key={cell.id} className="h-12" />;
          const isSelected = cell.key === selectedKey;
          const isToday = cell.key === todayKey;
          const isPast = cell.key < todayKey;
          return (
            <button
              key={cell.id}
              type="button"
              onClick={() => onSelect(cell.key)}
              aria-pressed={isSelected}
              aria-label={
                `${cell.day} ${MONTHS[month]} ${cell.weekday}` +
                (isToday ? ', bugün' : '') +
                (cell.count ? `, ${cell.count} etkinlik` : '')
              }
              className="relative h-12 flex items-center justify-center cursor-pointer"
            >
              <span
                className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[15px] ${
                  isSelected
                    ? 'bg-forest text-white font-black'
                    : isToday
                    ? 'border border-accent text-ink font-black'
                    : `${isPast ? 'text-muted' : 'text-ink'} ${cell.mark ? 'font-black' : 'font-semibold'}`
                }`}
              >
                {cell.day}
              </span>
              {cell.mark ? (
                <span className={`absolute bottom-0.5 h-[5px] bg-accent ${MARK_CLASS[cell.mark]}`} />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
