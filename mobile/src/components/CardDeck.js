import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  Modal,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { CARDS_DATA, IMAGES, CLUB_CONFIG } from '../data/mockData';
import { openWhatsApp } from '../utils/links';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width - 44, 345);

export default function CardDeck({ onSelectFilter }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const changeCard = useCallback(
    (direction = 1) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      Animated.timing(slideAnim, {
        toValue: direction > 0 ? 1 : -1,
        duration: 240,
        useNativeDriver: true
      }).start(() => {
        setCurrentIndex((prev) => (prev + direction + CARDS_DATA.length) % CARDS_DATA.length);
        slideAnim.setValue(0);
        isAnimatingRef.current = false;
      });
    },
    [slideAnim]
  );

  // Kullanıcı desteyle etkileşime girince otomatik geçiş kalıcı olarak durur
  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const openDetail = useCallback(
    (card) => {
      stopAutoPlay();
      setSelectedCard(card);
    },
    [stopAutoPlay]
  );

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      changeCard(1);
    }, 5000);
  }, [changeCard]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoPlay]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 15,
      onPanResponderGrant: () => {
        if (timerRef.current) clearInterval(timerRef.current);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -40) {
          changeCard(1);
        } else if (gesture.dx > 40) {
          changeCard(-1);
        }
      }
    })
  ).current;

  const activeData = CARDS_DATA[currentIndex];
  const progressPercent = (currentIndex / (CARDS_DATA.length - 1)) * 100;

  return (
    <View style={styles.section}>
      {/* 3D Kart Destesi */}
      <View style={styles.deckContainer} {...panResponder.panHandlers}>
        {[...CARDS_DATA].reverse().map((card) => {
          const idx = CARDS_DATA.findIndex((c) => c.id === card.id);
          const depth = (idx - currentIndex + CARDS_DATA.length) % CARDS_DATA.length;
          if (depth > 3 && depth < CARDS_DATA.length) return null;

          const isTop = depth === 0;
          const depthStyles = getDepthStyle(depth);

          const animatedStyle = isTop
            ? {
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [-1, 0, 1],
                      outputRange: [-220, 0, 220]
                    })
                  },
                  {
                    rotate: slideAnim.interpolate({
                      inputRange: [-1, 0, 1],
                      outputRange: ['-10deg', '0deg', '10deg']
                    })
                  }
                ],
                opacity: slideAnim.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [0.1, 1, 0.1]
                })
              }
            : {};

          return (
            <Animated.View
              key={card.id}
              pointerEvents={isTop ? 'auto' : 'none'}
              style={[styles.card, depthStyles, animatedStyle]}
            >
              <TouchableOpacity
                activeOpacity={0.95}
                style={styles.cardTouchable}
                onPress={() => openDetail(card)}
                accessibilityRole="button"
                accessibilityLabel={`${card.title} detaylarını incele`}
                accessibilityHint="Sağa veya sola kaydırarak diğer etkinliklere geçebilirsin"
              >
                <Image source={card.image} style={styles.cardImage} resizeMode="cover" />
                <LinearGradient
                  colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.42)', 'rgba(0,0,0,0.94)']}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardTopRow}>
                    <View style={styles.iconBubble}>
                      <MaterialCommunityIcons
                        name={card.icon}
                        size={17}
                        color={COLORS.white}
                      />
                    </View>
                  </View>

                  <View>
                    <Text style={styles.cardTag}>{card.tag}</Text>
                    <Text style={styles.cardTitle}>{card.title}</Text>
                    <View style={styles.cardBottomRow}>
                      <Text style={styles.cardDist}>{card.dist}</Text>
                      <View style={styles.selectBtn}>
                        <Text style={styles.selectBtnText}>SEÇ & İNCELE</Text>
                        <Ionicons name="arrow-forward" size={12} color={COLORS.accent} />
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {/* İlerleme Çizgisi & Duraklar */}
      <View style={styles.progressWrap}>
        <View style={styles.trackRow}>
          <View style={styles.trackBase} />
          <View style={[styles.trackFill, { width: `${progressPercent}%` }]} />
          {CARDS_DATA.map((item, dotIdx) => {
            const isCurrent = dotIdx === currentIndex;
            const isPassed = dotIdx <= currentIndex;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  stopAutoPlay();
                  setCurrentIndex(dotIdx);
                }}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={`${item.title} kartına git`}
                style={[
                  styles.dot,
                  isPassed && styles.dotPassed,
                  isCurrent && styles.dotCurrent
                ]}
              />
            );
          })}
          <View style={[styles.motoPointer, { left: `${progressPercent}%` }]}>
            <Image source={IMAGES.motoIcon} style={styles.motoIconImg} resizeMode="contain" />
          </View>
        </View>

        <View style={styles.counterRow}>
          <Text style={styles.counterText}>
            KEŞİF {String(currentIndex + 1).padStart(2, '0')} / {String(CARDS_DATA.length).padStart(2, '0')}
          </Text>
          <Text style={styles.counterTitle} numberOfLines={1}>
            {activeData.title}
          </Text>
        </View>
      </View>

      {/* Aktif Kart Bilgi Banner'ı */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => openDetail(activeData)}
        style={styles.banner}
        accessibilityRole="button"
        accessibilityLabel={`${activeData.detailTitle} detaylarını incele`}
      >
        <View style={styles.bannerBody}>
          <Text style={styles.bannerBadge}>{activeData.badge}</Text>
          <Text style={styles.bannerTitle}>{activeData.detailTitle}</Text>
          <Text style={styles.bannerDesc}>{activeData.desc}</Text>
          <Text style={styles.bannerMeta}>{activeData.meta}</Text>
        </View>
        <View style={styles.bannerArrow}>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
        </View>
      </TouchableOpacity>

      {/* Seç & İncele Etkinlik Detay Modalı */}
      <Modal
        visible={!!selectedCard}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedCard(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalBadges}>
                <View style={styles.catBadge}>
                  <Text style={styles.catBadgeText}>{selectedCard?.badge}</Text>
                </View>
                <Text style={styles.distBadge}>{selectedCard?.dist}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedCard(null)}
                style={styles.closeBtn}
                accessibilityRole="button"
                accessibilityLabel="Kapat"
                hitSlop={8}
              >
                <Ionicons name="close" size={18} color={COLORS.ink} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} contentContainerStyle={{ paddingBottom: 16 }}>
              {selectedCard?.image && (
                <View style={styles.modalHero}>
                  <Image source={selectedCard.image} style={styles.modalImg} resizeMode="cover" />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.85)']}
                    style={styles.modalHeroGrad}
                  >
                    <Text style={styles.modalHeroTag}>{selectedCard.tag}</Text>
                    <Text style={styles.modalHeroTitle}>{selectedCard.detailTitle}</Text>
                  </LinearGradient>
                </View>
              )}

              <View style={styles.detailBox}>
                <Text style={styles.detailHeading}>YAPILACAK ETKİNLİK HAKKINDA</Text>
                <Text style={styles.detailText}>
                  {selectedCard?.activityDetails || selectedCard?.desc}
                </Text>
              </View>

              {selectedCard?.equipment && (
                <View style={styles.equipBox}>
                  <View style={styles.equipLabelRow}>
                    <Ionicons name="shield-checkmark-outline" size={15} color={COLORS.accent} />
                    <Text style={styles.equipLabel}>GEREKLİ EKİPMAN & HAZIRLIK</Text>
                  </View>
                  <Text style={styles.equipText}>{selectedCard.equipment}</Text>
                </View>
              )}

              <View style={styles.infoNote}>
                <Text style={styles.infoNoteMeta}>{selectedCard?.meta}</Text>
                <View style={styles.infoNoteLocRow}>
                  <Ionicons name="location-outline" size={14} color={COLORS.accent} />
                  <Text style={styles.infoNoteLoc}>Buluşma: {CLUB_CONFIG.address}</Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.routesBtn}
                onPress={() => {
                  const filter = selectedCard?.filter;
                  setSelectedCard(null);
                  if (filter) onSelectFilter?.(filter);
                }}
              >
                <Ionicons name="map-outline" size={15} color={COLORS.ink} />
                <Text style={styles.routesBtnText}>Rotaları Gör</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.waBtn}
                onPress={() =>
                  openWhatsApp(
                    `Merhaba, ${selectedCard?.detailTitle || ''} etkinliği hakkında bilgi ve kayıt almak istiyorum.`
                  )
                }
              >
                <Ionicons name="chatbubble-outline" size={15} color={COLORS.white} />
                <Text style={styles.waBtnText}>Bilgi & Kayıt</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function getDepthStyle(depth) {
  switch (depth) {
    case 0:
      return {
        zIndex: 12,
        opacity: 1,
        transform: [{ translateX: 0 }, { translateY: 0 }, { scale: 1 }, { rotate: '0deg' }]
      };
    case 1:
      return {
        zIndex: 10,
        opacity: 0.92,
        transform: [{ translateX: 10 }, { translateY: -6 }, { scale: 0.96 }, { rotate: '2deg' }]
      };
    case 2:
      return {
        zIndex: 9,
        opacity: 0.82,
        transform: [{ translateX: -10 }, { translateY: -11 }, { scale: 0.92 }, { rotate: '-2deg' }]
      };
    default:
      return {
        zIndex: 7,
        opacity: 0.6,
        transform: [{ translateX: 0 }, { translateY: -16 }, { scale: 0.88 }, { rotate: '1deg' }]
      };
  }
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    backgroundColor: COLORS.white
  },
  deckContainer: {
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: 325,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.white,
    backgroundColor: COLORS.ink,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8
  },
  cardTouchable: {
    flex: 1
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%'
  },
  cardGradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 18
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  iconBubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardTag: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)'
  },
  cardDist: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    fontWeight: '700'
  },
  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.12)'
  },
  selectBtnText: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '800',
    textDecorationLine: 'underline'
  },
  progressWrap: {
    width: '100%',
    maxWidth: 280,
    alignSelf: 'center',
    marginVertical: 14,
    paddingHorizontal: 8
  },
  trackRow: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  trackBase: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    height: 3,
    backgroundColor: COLORS.accent,
    borderRadius: 2
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 2
  },
  dotPassed: {
    backgroundColor: COLORS.accent
  },
  dotCurrent: {
    transform: [{ scale: 1.25 }],
    borderWidth: 2,
    borderColor: 'rgba(194, 94, 46, 0.35)'
  },
  motoPointer: {
    position: 'absolute',
    top: -10,
    marginLeft: -14,
    zIndex: 5
  },
  motoIconImg: {
    width: 28,
    height: 28
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4
  },
  counterText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.8
  },
  counterTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.inkMuted,
    maxWidth: 160
  },
  banner: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outline,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2
  },
  bannerBody: {
    flex: 1
  },
  bannerBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.8,
    marginBottom: 4
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.ink
  },
  bannerDesc: {
    fontSize: 12.5,
    color: COLORS.muted,
    lineHeight: 18,
    marginTop: 4
  },
  bannerMeta: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.muted,
    marginTop: 8
  },
  bannerArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.ink,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  modalCard: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '88%',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.outline
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.sandLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outline
  },
  modalBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1
  },
  catBadge: {
    backgroundColor: COLORS.forest,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999
  },
  catBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800'
  },
  distBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.accent
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.sandDark,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBody: {
    padding: 16
  },
  modalHero: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14
  },
  modalImg: {
    width: '100%',
    height: '100%'
  },
  modalHeroGrad: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 14
  },
  modalHeroTag: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '800'
  },
  modalHeroTitle: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 2
  },
  detailBox: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: COLORS.sandLight,
    borderWidth: 1,
    borderColor: COLORS.outline,
    marginBottom: 12
  },
  detailHeading: {
    fontSize: 10.5,
    fontWeight: '800',
    color: COLORS.accent,
    marginBottom: 6,
    letterSpacing: 0.6
  },
  detailText: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.ink
  },
  equipBox: {
    padding: 13,
    borderRadius: 14,
    backgroundColor: COLORS.sandLight,
    borderWidth: 1,
    borderColor: COLORS.outline,
    marginBottom: 12
  },
  equipLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  equipLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: COLORS.forest
  },
  equipText: {
    fontSize: 12.5,
    color: COLORS.inkMuted,
    lineHeight: 18,
    marginTop: 5
  },
  infoNote: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(27, 59, 43, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(27, 59, 43, 0.16)',
    gap: 6
  },
  infoNoteMeta: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.forest
  },
  infoNoteLocRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5
  },
  infoNoteLoc: {
    flex: 1,
    fontSize: 11.5,
    color: COLORS.inkMuted,
    lineHeight: 16
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    backgroundColor: COLORS.sandLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.outline
  },
  routesBtn: {
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
  routesBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.ink
  },
  waBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.forest,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  waBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.white
  }
});
