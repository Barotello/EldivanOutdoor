import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { CLUB_CONFIG, IMAGES } from '../data/mockData';

export default function ContactFooter() {
  return (
    <View style={styles.section}>
      <View style={styles.card}>
        <View style={styles.brandRow}>
          <Image source={IMAGES.logo} style={styles.logo} />
          <Text style={styles.brandLabel}>ELDİVAN DOĞA VE MOTOR SPORLARI</Text>
        </View>

        <Text style={styles.title}>Doğada Birlikte Keşfedelim.</Text>
        <Text style={styles.desc}>
          Etkinlik takvimi, katılım şartları ve ortak turlarımız için kulüp ekibimizle iletişime geçin.
        </Text>

        <View style={styles.addressBox}>
          <Ionicons name="location-outline" size={16} color={COLORS.accent} />
          <Text style={styles.addressText}>{CLUB_CONFIG.address}</Text>
        </View>

        <TouchableOpacity
          style={styles.waBtn}
          activeOpacity={0.9}
          onPress={() =>
            Linking.openURL(
              `https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20Eldivan%20Outdoor%20etkinliklerine%20kat%C4%B1lmak%20istiyorum.`
            )
          }
        >
          <Text style={styles.waBtnText}>WHATSAPP İLE İLETİŞİME GEÇ</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
        </TouchableOpacity>

        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() => Linking.openURL(CLUB_CONFIG.phoneHref)}
          >
            <Ionicons name="call-outline" size={14} color={COLORS.accent} />
            <Text style={styles.quickBtnText}>Hemen Ara</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() => Linking.openURL(CLUB_CONFIG.meetingPointMapsUrl)}
          >
            <Ionicons name="location-outline" size={14} color={COLORS.accent} />
            <Text style={styles.quickBtnText}>Yol Tarifi Al</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.copyright}>© 2026 EDMSK HOBİ KULÜBÜ</Text>
        <Image source={IMAGES.ataturk} style={styles.ataturkImg} resizeMode="cover" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 18,
    paddingVertical: 22,
    backgroundColor: COLORS.sand,
    borderTopWidth: 1,
    borderTopColor: COLORS.outline
  },
  card: {
    padding: 22,
    borderRadius: 20,
    backgroundColor: COLORS.forest
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)'
  },
  brandLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#E6F4EA',
    letterSpacing: 0.7
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.white,
    marginBottom: 8
  },
  desc: {
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.82)',
    marginBottom: 12
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    marginBottom: 14
  },
  addressText: {
    flex: 1,
    color: 'rgba(255,255,255,0.92)',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600'
  },
  waBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: COLORS.accent
  },
  waBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12
  },
  quickBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)'
  },
  quickBtnText: {
    color: COLORS.white,
    fontSize: 11.5,
    fontWeight: '800'
  },
  footer: {
    marginTop: 22,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.outline,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  copyright: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.muted
  },
  ataturkImg: {
    width: 56,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  }
});

