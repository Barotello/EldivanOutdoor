import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { EVENTS_DATA } from '../data/mockData';
import { eventDayRange, parseDayKey } from '../utils/events';

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
    <View style={styles.card}>
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => shift(-1)}
          accessibilityRole="button"
          accessibilityLabel="Önceki ay"
        >
          <Ionicons name="chevron-back" size={18} color={COLORS.ink} />
        </TouchableOpacity>
        <View style={styles.navTitle}>
          <Text style={styles.monthTitle}>
            {MONTHS[month]} {year}
          </Text>
          <Text style={styles.monthCount}>{monthCount ? `${monthCount} ETKİNLİK` : 'ETKİNLİK YOK'}</Text>
        </View>
        <TouchableOpacity
          style={styles.todayBtn}
          onPress={() => {
            setVisible(monthOf(todayKey));
            onSelect(todayKey);
          }}
          accessibilityRole="button"
          accessibilityLabel="Bugüne git"
        >
          <Text style={styles.todayText}>Bugün</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => shift(1)}
          accessibilityRole="button"
          accessibilityLabel="Sonraki ay"
        >
          <Ionicons name="chevron-forward" size={18} color={COLORS.ink} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {WEEKDAYS.map((w, i) => (
          <Text key={w} style={[styles.weekday, i > 4 && styles.weekend]}>
            {w}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((cell) => {
          if (!cell.key) return <View key={cell.id} style={styles.cell} />;
          const isSelected = cell.key === selectedKey;
          const isToday = cell.key === todayKey;
          const isPast = cell.key < todayKey;
          return (
            <TouchableOpacity
              key={cell.id}
              style={styles.cell}
              activeOpacity={0.7}
              onPress={() => onSelect(cell.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={
                `${cell.day} ${MONTHS[month]} ${cell.weekday}` +
                (isToday ? ', bugün' : '') +
                (cell.count ? `, ${cell.count} etkinlik` : '')
              }
            >
              <View style={[styles.num, isToday && styles.numToday, isSelected && styles.numSelected]}>
                <Text
                  style={[
                    styles.numText,
                    isPast && styles.numTextPast,
                    (cell.mark || isToday) && styles.numTextStrong,
                    isSelected && styles.numTextSelected
                  ]}
                >
                  {cell.day}
                </Text>
              </View>
              {cell.mark ? <View style={[styles.mark, styles[`mark_${cell.mark}`]]} /> : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 12,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  navBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.sand,
    borderWidth: 1,
    borderColor: COLORS.outline,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navTitle: {
    flex: 1,
    alignItems: 'center'
  },
  monthTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.ink
  },
  monthCount: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.4
  },
  todayBtn: {
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outline,
    alignItems: 'center',
    justifyContent: 'center'
  },
  todayText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.ink
  },
  weekRow: {
    flexDirection: 'row',
    marginTop: 12
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.muted,
    letterSpacing: 0.4
  },
  weekend: {
    color: COLORS.inkMuted
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    rowGap: 2
  },
  cell: {
    width: `${100 / 7}%`,
    height: 46,
    paddingTop: 2,
    alignItems: 'center'
  },
  num: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numToday: {
    borderWidth: 1.5,
    borderColor: COLORS.accent
  },
  numSelected: {
    backgroundColor: COLORS.forest,
    borderWidth: 0
  },
  numText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.ink
  },
  numTextPast: {
    color: COLORS.muted
  },
  numTextStrong: {
    fontWeight: '900',
    color: COLORS.ink
  },
  numTextSelected: {
    fontWeight: '900',
    color: COLORS.white
  },
  mark: {
    position: 'absolute',
    bottom: 2,
    height: 4,
    backgroundColor: COLORS.accent
  },
  mark_dot: {
    width: 5,
    height: 5,
    bottom: 1.5,
    borderRadius: 2.5
  },
  mark_start: {
    left: '50%',
    right: 0,
    marginLeft: -2.5,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3
  },
  mark_middle: {
    left: 0,
    right: 0
  },
  mark_end: {
    left: 0,
    right: '50%',
    marginRight: -2.5,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3
  }
});
