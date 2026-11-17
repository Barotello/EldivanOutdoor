import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { CARDS_DATA, IMAGES } from '../data/mockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width - 44, 345);

export default function CardDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  // Kaydırma bitince parmak kalkarken oluşan "dokunma" detay ekranını açmasın
  const swipingRef = useRef(false);

  // direction  1 → sonraki kart: üstteki kart SOLA çıkar (sola kaydırma)
  // direction -1 → önceki kart: üstteki kart SAĞA çıkar (sağa kaydırma)
  const changeCard = useCallback(
    (direction = 1) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      Animated.timing(slideAnim, {
        toValue: direction > 0 ? -1 : 1,
        duration: 220,
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
      if (swipingRef.current) return;
      stopAutoPlay();
      router.push(`/aktivite/${card.id}`);
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
      // Sadece yatay hareketi yakala; dikey kaydırma sayfayı kaydırmaya devam etsin
      onMoveShouldSetPanResponder: (_, g) =>
        !isAnimatingRef.current && Math.abs(g.dx) > 12 && Math.abs(g.dx) > Math.abs(g.dy),
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        swipingRef.current = true;
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
      },
      // Kart parmağı takip eder: sağa çekince sağa, sola çekince sola gider
      onPanResponderMove: (_, g) => {
        slideAnim.setValue(Math.max(-1, Math.min(1, g.dx / 220)));
      },
      onPanResponderRelease: (_, g) => {
        setTimeout(() => {
          swipingRef.current = false;
        }, 350);
        const swipedFast = Math.abs(g.vx) > 0.5;
        if (g.dx < -60 || (swipedFast && g.dx < 0)) {
          changeCard(1);
        } else if (g.dx > 60 || (swipedFast && g.dx > 0)) {
          changeCard(-1);
        } else {
          Animated.spring(slideAnim, { toValue: 0, friction: 6, useNativeDriver: true }).start();
        }
      },
      onPanResponderTerminate: () => {
        swipingRef.current = false;
        Animated.spring(slideAnim, { toValue: 0, friction: 6, useNativeDriver: true }).start();
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
                  // Fotoğrafın üst yarısı açık kalır; koyuluk yalnızca yazıların altında toplanır
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.62)', 'rgba(0,0,0,0.92)']}
                  locations={[0, 0.42, 0.72, 1]}
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
                    <Text style={styles.cardDesc} numberOfLines={2}>
                      {card.desc}
                    </Text>
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
    height: 445,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: 420,
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
    color: COLORS.gold,
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
  cardDesc: {
    color: 'rgba(255,255,255,0.86)',
    fontSize: 12.5,
    lineHeight: 18,
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
  }
});
