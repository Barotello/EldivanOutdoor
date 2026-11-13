import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { CLUB_CONFIG, IMAGES } from '../data/mockData';

export default function SidebarDrawer({
  visible,
  onClose,
  onNavigate,
  onReplaySplash
}) {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [showOsmanModal, setShowOsmanModal] = useState(false);

  const navItems = [
    {
      title: 'Rotalar & Parkurlar',
      icon: 'terminal-outline',
      items: [
        { title: 'Zirve & Tırmanış (Çaşnigir)', action: () => onNavigate?.('rotalar') },
        { title: 'Enduro & Motosiklet Parkuru', action: () => onNavigate?.('rotalar') },
        { title: 'Kanyon, Vadi & Kamp Yolu', action: () => onNavigate?.('rotalar') },
        { title: 'Tüm Rotaları İncele', action: () => onNavigate?.('rotalar') }
      ]
    },
    {
      title: 'Kulüp & Etkinlikler',
      icon: 'people-outline',
      items: [
        { title: 'Haftalık Enduro Sürüşü', action: () => onNavigate?.('etkinlikler') },
        { title: 'Doğada Hayatta Kalma Kampı', action: () => onNavigate?.('etkinlikler') },
        { title: 'Zirve Foto Safari', action: () => onNavigate?.('etkinlikler') },
        { title: 'Tüm Program Takvimi', action: () => onNavigate?.('etkinlikler') }
      ]
    },
    {
      title: 'Saha & Canlı Durum',
      icon: 'book-outline',
      items: [
        { title: 'Canlı Hava & Rüzgar (12°C)', action: () => onNavigate?.('saha') },
        { title: 'Zemin & Parkur Bilgileri', action: () => onNavigate?.('saha') },
        { title: 'GPS Canlı Saha Haritası', action: () => onNavigate?.('saha') }
      ]
    },
    {
      title: 'Ayarlar & İletişim',
      icon: 'options-outline',
      items: [
        {
          title: 'WhatsApp İletişim Hattı',
          action: () =>
            Linking.openURL(
              `https://wa.me/${CLUB_CONFIG.whatsappNumber}?text=Merhaba,%20Eldivan%20Outdoor%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`
            )
        },
        { title: 'Buluşma Noktası & Konum', action: () => onNavigate?.('iletisim') },
        {
          title: 'Açılış Animasyonunu Oynat',
          action: () => {
            onClose?.();
            onReplaySplash?.();
          }
        }
      ]
    }
  ];

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.backdrop}>
          <TouchableOpacity style={styles.backdropTouch} onPress={onClose} />

          <View style={styles.drawer}>
            {/* Üst Header */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.brandBtn}
                onPress={() => onNavigate?.('kesif')}
              >
                <View style={styles.brandIconWrap}>
                  <Image source={IMAGES.appIcon} style={styles.brandIcon} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.brandTitle}>Eldivan Outdoor</Text>
                  <Text style={styles.brandSub}>Doğa & Motor Sporları</Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Ionicons name="close" size={18} color={COLORS.white} />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

            {/* Menü Ağacı */}
            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={styles.groupLabel}>PLATFORM</Text>

              {navItems.map((group, idx) => {
                const isOpen = expandedIndex === idx;
                return (
                  <View key={group.title} style={styles.groupWrap}>
                    <TouchableOpacity
                      style={styles.groupBtn}
                      onPress={() => setExpandedIndex(isOpen ? -1 : idx)}
                    >
                      <View style={styles.groupLeft}>
                        <Ionicons
                          name={group.icon}
                          size={19}
                          color={isOpen ? COLORS.gold : 'rgba(255,255,255,0.75)'}
                        />
                        <Text style={styles.groupTitle}>{group.title}</Text>
                      </View>
                      <Ionicons
                        name={isOpen ? 'chevron-down' : 'chevron-forward'}
                        size={16}
                        color="rgba(255,255,255,0.45)"
                      />
                    </TouchableOpacity>

                    {isOpen && (
                      <View style={styles.subList}>
                        {group.items.map((sub) => (
                          <TouchableOpacity
                            key={sub.title}
                            style={styles.subBtn}
                            onPress={() => {
                              onClose?.();
                              setTimeout(() => sub.action(), 120);
                            }}
                          >
                            <Text style={styles.subText}>{sub.title}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>

            {/* Alt Footer: Osman Ördek */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.profileBtn}
                onPress={() => {
                  onClose?.();
                  setShowOsmanModal(true);
                }}
              >
                <View style={styles.avatarWrap}>
                  <Image source={IMAGES.osman} style={styles.avatarImg} />
                  <View style={styles.onlineDot} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.profileName}>Osman Ördek</Text>
                  <Text style={styles.profileRole}>Kurucu</Text>
                </View>
                <Ionicons name="chevron-expand" size={16} color="rgba(255,255,255,0.45)" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Osman Ördek Profil Kartı Modalı */}
      <Modal
        visible={showOsmanModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOsmanModal(false)}
      >
        <View style={styles.osmanBackdrop}>
          <View style={styles.osmanCard}>
            <TouchableOpacity
              style={styles.osmanClose}
              onPress={() => setShowOsmanModal(false)}
            >
              <Ionicons name="close" size={20} color={COLORS.white} />
            </TouchableOpacity>

            <Image source={IMAGES.osman} style={styles.osmanAvatar} />
            <Text style={styles.osmanName}>Osman Ördek</Text>
            <View style={styles.osmanBadge}>
              <View style={styles.osmanGreenDot} />
              <Text style={styles.osmanRole}>Kurucu · Eldivan Outdoor</Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  backdropTouch: {
    flex: 1
  },
  drawer: {
    width: '84%',
    maxWidth: 330,
    height: '100%',
    backgroundColor: COLORS.sidebarBg,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.1)'
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)'
  },
  brandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  brandIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#234533',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  brandIcon: {
    width: 26,
    height: 26,
    borderRadius: 6
  },
  brandTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800'
  },
  brandSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11.5,
    marginTop: 1
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 14
  },
  groupLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 1,
    paddingHorizontal: 10,
    marginBottom: 8
  },
  groupWrap: {
    marginBottom: 6
  },
  groupBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 12
  },
  groupLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1
  },
  groupTitle: {
    color: COLORS.white,
    fontSize: 14.5,
    fontWeight: '700'
  },
  subList: {
    marginLeft: 18,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(255,255,255,0.15)',
    gap: 4,
    marginBottom: 6
  },
  subBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8
  },
  subText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13.5
  },
  footer: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: COLORS.sidebarFooterBg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)'
  },
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  avatarWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    position: 'relative'
  },
  avatarImg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)'
  },
  onlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.whatsapp,
    borderWidth: 2,
    borderColor: COLORS.sidebarFooterBg
  },
  profileName: {
    color: COLORS.white,
    fontSize: 14.5,
    fontWeight: '800'
  },
  profileRole: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11.5
  },
  osmanBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  osmanCard: {
    width: 310,
    borderRadius: 24,
    backgroundColor: '#1E1C24',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    padding: 24,
    alignItems: 'center'
  },
  osmanClose: {
    alignSelf: 'flex-end',
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  osmanAvatar: {
    width: 150,
    height: 150,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 16
  },
  osmanName: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '900'
  },
  osmanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)'
  },
  osmanGreenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.whatsapp
  },
  osmanRole: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: '700'
  }
});

