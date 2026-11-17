import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Share
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { COLORS } from '../theme/colors';
import { CLUB_CONFIG } from '../data/mockData';
import { openUrl, openWhatsApp } from '../utils/links';

const DANGER = '#B3261E';
const DANGER_DARK = '#8C1D18';

const CHECKLIST = [
  'Rotanı ve dönüş saatini bir yakınına ya da kulübe bildir.',
  'Telefonunu tam şarj et, yanına powerbank al.',
  'Hava durumunu kontrol et; gün batımından önce dönmeyi planla.',
  'En az 1,5 L su, katmanlı giysi ve kafa feneri bulundur.',
  'Kaybolursan olduğun yerde kal, enerjini ve şarjını koru.'
];

function mapsLink(coords) {
  return `https://maps.google.com/?q=${coords.latitude.toFixed(5)},${coords.longitude.toFixed(5)}`;
}

export default function GuvenlikScreen() {
  const insets = useSafeAreaInsets();
  const [loc, setLoc] = useState({ status: 'idle', coords: null, message: null });

  const getLocation = async () => {
    setLoc({ status: 'loading', coords: null, message: null });
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoc({
          status: 'error',
          coords: null,
          message: 'Konum izni verilmedi. Ayarlardan izin verip tekrar dene.'
        });
        return null;
      }
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLoc({ status: 'ready', coords: pos.coords, message: null });
      return pos.coords;
    } catch {
      setLoc({
        status: 'error',
        coords: null,
        message: 'Konum alınamadı. GPS açık mı? Açık alanda tekrar dene.'
      });
      return null;
    }
  };

  const buildMessage = (coords) =>
    `Eldivan Outdoor – konumum:\n${mapsLink(coords)}\n` +
    `Koordinat: ${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}` +
    (coords.accuracy ? ` (±${Math.round(coords.accuracy)} m)` : '');

  const shareLocation = async () => {
    const coords = loc.coords ?? (await getLocation());
    if (!coords) return;
    try {
      await Share.share({ message: buildMessage(coords) });
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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>Güvenlik & SOS</Text>
        <TouchableOpacity
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Kapat"
          hitSlop={8}
        >
          <Ionicons name="close" size={20} color={COLORS.ink} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity
          style={styles.sosBtn}
          activeOpacity={0.85}
          onPress={() => openUrl('tel:112')}
          accessibilityRole="button"
          accessibilityLabel="112 acil çağrı merkezini ara"
        >
          <Ionicons name="call" size={30} color={COLORS.white} />
          <View style={{ flex: 1 }}>
            <Text style={styles.sosTitle}>112'yi Ara</Text>
            <Text style={styles.sosSub}>Ambulans, jandarma (JAK), itfaiye, AFAD</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Ionicons name="locate-outline" size={18} color={COLORS.forest} />
            <Text style={styles.cardTitle}>Konumum</Text>
          </View>

          {loc.status === 'loading' && (
            <View style={styles.row}>
              <ActivityIndicator color={COLORS.accent} />
              <Text style={styles.muted}>Konum alınıyor…</Text>
            </View>
          )}
          {loc.status === 'error' && <Text style={styles.errorText}>{loc.message}</Text>}
          {loc.status === 'ready' && loc.coords && (
            <View style={styles.coordBox}>
              <Text style={styles.coordValue} selectable>
                {loc.coords.latitude.toFixed(5)}, {loc.coords.longitude.toFixed(5)}
              </Text>
              <Text style={styles.muted}>
                Doğruluk: ±{Math.round(loc.coords.accuracy ?? 0)} m
                {loc.coords.altitude != null ? ` · Rakım: ${Math.round(loc.coords.altitude)} m` : ''}
              </Text>
            </View>
          )}
          {loc.status === 'idle' && (
            <Text style={styles.muted}>
              Konumunu alıp kurtarma ekipleriyle ya da kulüple paylaşabilirsin.
            </Text>
          )}

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.secondaryBtn} onPress={getLocation} accessibilityRole="button">
              <Ionicons name="refresh" size={15} color={COLORS.ink} />
              <Text style={styles.secondaryText}>
                {loc.status === 'ready' ? 'Yenile' : 'Konumu Al'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn} onPress={shareLocation} accessibilityRole="button">
              <Ionicons name="share-outline" size={15} color={COLORS.ink} />
              <Text style={styles.secondaryText}>Paylaş</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.waBtn} onPress={sendToClub} accessibilityRole="button">
            <Ionicons name="logo-whatsapp" size={16} color={COLORS.white} />
            <Text style={styles.waText}>Konumu Kulübe Gönder</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Ionicons name="people-outline" size={18} color={COLORS.forest} />
            <Text style={styles.cardTitle}>Kulübe Ulaş</Text>
          </View>
          <TouchableOpacity
            style={styles.listBtn}
            onPress={() => openUrl(CLUB_CONFIG.phoneHref)}
            accessibilityRole="button"
          >
            <Ionicons name="call-outline" size={16} color={COLORS.accent} />
            <Text style={styles.listText}>Kulübü ara · {CLUB_CONFIG.phoneDisplay}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Ionicons name="checkbox-outline" size={18} color={COLORS.forest} />
            <Text style={styles.cardTitle}>Rotaya Çıkmadan Önce</Text>
          </View>
          {CHECKLIST.map((item) => (
            <View key={item} style={styles.checkRow}>
              <Ionicons name="checkmark-circle-outline" size={16} color={COLORS.forest} />
              <Text style={styles.checkText}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.sandLight },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12
  },
  topTitle: { fontSize: 22, fontWeight: '900', color: COLORS.ink },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.sandDark,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: { paddingHorizontal: 18, gap: 14 },
  sosBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderRadius: 20,
    backgroundColor: DANGER
  },
  sosTitle: { fontSize: 24, fontWeight: '900', color: COLORS.white },
  sosSub: { fontSize: 12.5, fontWeight: '700', color: 'rgba(255,255,255,0.88)', marginTop: 2 },
  card: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outline,
    gap: 10
  },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardTitle: { fontSize: 16, fontWeight: '900', color: COLORS.ink },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  muted: { fontSize: 13, color: COLORS.inkMuted, lineHeight: 19 },
  errorText: { fontSize: 13, color: DANGER_DARK, fontWeight: '700' },
  coordBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.sand,
    gap: 3
  },
  coordValue: { fontSize: 18, fontWeight: '900', color: COLORS.ink },
  btnRow: { flexDirection: 'row', gap: 10 },
  secondaryBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.sandDark,
    borderWidth: 1,
    borderColor: COLORS.outline,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  secondaryText: { fontSize: 13, fontWeight: '800', color: COLORS.ink },
  waBtn: {
    height: 46,
    borderRadius: 12,
    backgroundColor: COLORS.whatsappDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  waText: { fontSize: 14, fontWeight: '800', color: COLORS.white },
  listBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10
  },
  listText: { fontSize: 14, fontWeight: '700', color: COLORS.ink },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  checkText: { flex: 1, fontSize: 13.5, lineHeight: 19, color: COLORS.ink }
});
