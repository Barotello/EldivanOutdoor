import React, { useMemo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { PACKAGES_DATA } from '../data/mockData';
import { openUrl, openWhatsApp } from '../utils/links';
import {
  getUpcomingEvents,
  getEventsOnDay,
  getNextEventAfter,
  isEventPast,
  dayKey,
  parseDayKey
} from '../utils/events';
import EventCalendar from './EventCalendar';

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
const VIEWS = [
  { id: 'list', label: 'Liste', icon: 'list-outline' },
  { id: 'calendar', label: 'Takvim', icon: 'calendar-outline' }
];

function dateParts(event) {
  if (!event.startsAt) return null;
  const d = new Date(event.startsAt);
  return { day: String(d.getDate()).padStart(2, '0'), month: MONTHS[d.getMonth()] };
}

function SectionHeader({ icon, title, right }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <Ionicons name={icon} size={17} color={COLORS.accent} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {right ? <Text style={styles.sectionRight}>{right}</Text> : null}
    </View>
  );
}

function ViewToggle({ value, onChange }) {
  return (
    <View style={styles.toggle}>
      {VIEWS.map((v) => {
        const active = v.id === value;
        return (
          <TouchableOpacity
            key={v.id}
            style={[styles.toggleBtn, active && styles.toggleBtnActive]}
            onPress={() => onChange(v.id)}
            hitSlop={{ top: 4, bottom: 4 }}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`${v.label} görünümü`}
          >
            <Ionicons name={v.icon} size={15} color={active ? COLORS.ink : COLORS.inkMuted} />
            <Text style={[styles.toggleText, active && styles.toggleTextActive]}>{v.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
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
    <View style={styles.calendarSection}>
      <EventCalendar selectedKey={selectedKey} todayKey={todayKey} onSelect={setSelectedKey} />

      <View style={styles.dayHeader}>
        <Text style={styles.dayLabel}>{dayLabel}</Text>
        {dayEvents.length ? <Text style={styles.sectionRight}>{dayEvents.length} ETKİNLİK</Text> : null}
      </View>

      <View style={styles.list}>
        {dayEvents.length ? (
          dayEvents.map((event) => <EventRow key={event.id} event={event} past={isEventPast(event)} />)
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons name="calendar-clear-outline" size={22} color={COLORS.gold} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.emptyTitle}>Bu tarihte etkinlik yok</Text>
              <Text style={styles.emptyDesc} numberOfLines={2}>
                {nextEvent
                  ? `Sıradaki: ${nextDate.getDate()} ${MONTHS_FULL[nextDate.getMonth()]} · ${nextEvent.title}`
                  : 'Yeni tarihler açılınca burada görünecek.'}
              </Text>
            </View>
            {nextEvent ? (
              <TouchableOpacity
                style={styles.smallBtn}
                onPress={() => setSelectedKey(dayKey(nextEvent.startsAt))}
                accessibilityRole="button"
                accessibilityLabel={`Sıradaki etkinliğe git: ${nextEvent.title}`}
              >
                <Text style={styles.smallBtnText}>Sıradaki</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
}

function EventRow({ event, past = false }) {
  const parts = dateParts(event);
  return (
    <View style={styles.eventCard}>
      <View style={styles.eventTop}>
        <View style={styles.dateBlock}>
          <Text style={styles.dateDay}>{parts?.day ?? '--'}</Text>
          <Text style={styles.dateMonth}>{parts?.month ?? ''}</Text>
        </View>
        <View style={styles.eventBody}>
          {past ? (
            <Text style={[styles.eventBadge, styles.eventBadgePast]}>TAMAMLANDI</Text>
          ) : event.badge ? (
            <Text style={styles.eventBadge}>{event.badge}</Text>
          ) : null}
          <Text style={styles.eventTitle} numberOfLines={2}>
            {event.title}
          </Text>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={13} color={COLORS.muted} />
            <Text style={styles.metaText}>{event.time}</Text>
            <Ionicons name="location-outline" size={13} color={COLORS.muted} style={{ marginLeft: 6 }} />
            <Text style={[styles.metaText, { flex: 1 }]} numberOfLines={1}>
              {event.location}
            </Text>
          </View>
          {event.quota && !past ? <Text style={styles.quota}>{event.quota}</Text> : null}
        </View>
      </View>

      {past ? null : (
      <View style={styles.eventActions}>
        {event.calendarUrl ? (
          <TouchableOpacity
            style={styles.ghostBtn}
            onPress={() => openUrl(event.calendarUrl)}
            accessibilityRole="button"
            accessibilityLabel={`${event.title} etkinliğini takvime ekle`}
          >
            <Ionicons name="calendar-outline" size={15} color={COLORS.ink} />
            <Text style={styles.ghostText}>Takvime Ekle</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => openWhatsApp(`Merhaba, ${event.title} etkinliğine katılmak istiyorum.`)}
          accessibilityRole="button"
          accessibilityLabel={`${event.title} etkinliğine katıl`}
        >
          <Ionicons name="logo-whatsapp" size={15} color={COLORS.white} />
          <Text style={styles.primaryText}>Katıl</Text>
        </TouchableOpacity>
      </View>
      )}
    </View>
  );
}

function EmptyEvents() {
  return (
    <View style={styles.emptyCard}>
      <View style={styles.emptyIcon}>
        <Ionicons name="calendar-clear-outline" size={22} color={COLORS.gold} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.emptyTitle}>Yeni etkinlikler yakında</Text>
        <Text style={styles.emptyDesc}>Tarihler açılınca haber verelim.</Text>
      </View>
      <TouchableOpacity
        style={styles.smallBtn}
        onPress={() => openWhatsApp('Merhaba, yeni etkinlik tarihlerinden haberdar olmak istiyorum.')}
        accessibilityRole="button"
        accessibilityLabel="Yeni etkinliklerden haberdar ol"
      >
        <Text style={styles.smallBtnText}>Haber Ver</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProgramRow({ pkg }) {
  return (
    <TouchableOpacity
      style={styles.programCard}
      activeOpacity={0.9}
      onPress={() => openWhatsApp(`Merhaba, ${pkg.title} programı için rezervasyon ve bilgi almak istiyorum.`)}
      accessibilityRole="button"
      accessibilityLabel={`${pkg.title}, ${pkg.price}, rezervasyon yap`}
    >
      <Image source={pkg.image} style={styles.programImg} resizeMode="cover" />
      <View style={styles.programBody}>
        <Text style={styles.programBadge}>{pkg.badge}</Text>
        <Text style={styles.programTitle} numberOfLines={2}>
          {pkg.title}
        </Text>
        <Text style={styles.programDesc} numberOfLines={2}>
          {pkg.desc}
        </Text>
        <View style={styles.programFooter}>
          <Text style={styles.price}>
            <Text style={styles.priceLabel}>{pkg.priceLabel} </Text>
            {pkg.price}
          </Text>
          <View style={styles.reserveChip}>
            <Text style={styles.reserveText}>Rezervasyon</Text>
            <Ionicons name="chevron-forward" size={13} color={COLORS.accent} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ClubEvents() {
  const upcomingEvents = useMemo(() => getUpcomingEvents(), []);
  const year = new Date().getFullYear();
  const [view, setView] = useState('calendar');

  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>Etkinlikler</Text>
          <Text style={styles.subheading} numberOfLines={2}>
            Kulüp takvimi ve {year} sezonu programları
          </Text>
        </View>
        <ViewToggle value={view} onChange={setView} />
      </View>

      {view === 'calendar' ? (
        <CalendarSection />
      ) : (
        <>
          <SectionHeader
            icon="calendar-outline"
            title="Yaklaşan"
            right={upcomingEvents.length ? `${upcomingEvents.length} ETKİNLİK` : null}
          />
          <View style={styles.list}>
            {upcomingEvents.length === 0 ? (
              <EmptyEvents />
            ) : (
              upcomingEvents.map((event) => <EventRow key={event.id} event={event} />)
            )}
          </View>
        </>
      )}

      <SectionHeader icon="people-outline" title="Kulüp Programları" right="GRUP & AİLE" />
      <View style={styles.list}>
        {PACKAGES_DATA.map((pkg) => (
          <ProgramRow key={pkg.id} pkg={pkg} />
        ))}
      </View>

      <View style={styles.note}>
        <Ionicons name="information-circle-outline" size={16} color={COLORS.forest} />
        <Text style={styles.noteText}>
          Kayıt ve rezervasyonlar şimdilik WhatsApp üzerinden alınıyor. Kontenjan dolmadan yazmayı unutma.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20
  },
  heading: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.ink
  },
  subheading: {
    fontSize: 13,
    color: COLORS.inkMuted,
    marginTop: 2
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  toggle: {
    flexDirection: 'row',
    gap: 2,
    padding: 3,
    borderRadius: 14,
    backgroundColor: COLORS.sandDark,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  toggleBtn: {
    height: 38,
    paddingHorizontal: 11,
    borderRadius: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  toggleBtnActive: {
    backgroundColor: COLORS.white
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.inkMuted
  },
  toggleTextActive: {
    fontWeight: '800',
    color: COLORS.ink
  },
  calendarSection: {
    marginTop: 16
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 10
  },
  dayLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: 0.3
  },
  eventBadgePast: {
    color: COLORS.muted
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
    marginBottom: 10
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.ink
  },
  sectionRight: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.4
  },
  list: {
    gap: 10
  },

  eventCard: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outline,
    gap: 12
  },
  eventTop: {
    flexDirection: 'row',
    gap: 12
  },
  dateBlock: {
    width: 56,
    height: 62,
    borderRadius: 14,
    backgroundColor: COLORS.forest,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateDay: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.white
  },
  dateMonth: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.gold,
    letterSpacing: 0.6
  },
  eventBody: {
    flex: 1,
    gap: 3
  },
  eventBadge: {
    fontSize: 10.5,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.5
  },
  eventTitle: {
    fontSize: 15.5,
    fontWeight: '900',
    color: COLORS.ink
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.inkMuted
  },
  quota: {
    fontSize: 11.5,
    fontWeight: '800',
    color: COLORS.forest
  },
  eventActions: {
    flexDirection: 'row',
    gap: 8
  },
  ghostBtn: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.sand,
    borderWidth: 1,
    borderColor: COLORS.outline,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  ghostText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.ink
  },
  primaryBtn: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.forest,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  primaryText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white
  },

  emptyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  emptyIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: COLORS.forest,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.ink
  },
  emptyDesc: {
    fontSize: 12.5,
    color: COLORS.inkMuted,
    marginTop: 2
  },
  smallBtn: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: COLORS.forest
  },
  smallBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.white
  },

  programCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 10,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  programImg: {
    width: 92,
    height: 112,
    borderRadius: 12
  },
  programBody: {
    flex: 1,
    gap: 3
  },
  programBadge: {
    fontSize: 10.5,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.5
  },
  programTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.ink
  },
  programDesc: {
    fontSize: 12.5,
    lineHeight: 17,
    color: COLORS.inkMuted
  },
  programFooter: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6
  },
  price: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.ink
  },
  priceLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: COLORS.muted
  },
  reserveChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  reserveText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: COLORS.accent
  },

  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 18,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(27, 59, 43, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(27, 59, 43, 0.16)'
  },
  noteText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    color: COLORS.forest,
    fontWeight: '600'
  }
});
