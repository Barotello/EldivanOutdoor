import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { IMAGES } from '../data/mockData';

const { height } = Dimensions.get('window');

export default function Splash({ replayTrigger = 0, onFinish }) {
  const [visible, setVisible] = useState(true);
  const scaleAnim = useRef(new Animated.Value(0.35)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef(null);
  const hasShownOnce = useRef(false);

  useEffect(() => {
    if (hasShownOnce.current && replayTrigger === 0) return;
    hasShownOnce.current = true;
    setVisible(true);
    scaleAnim.setValue(0.35);
    opacityAnim.setValue(0);
    fadeOutAnim.setValue(1);

    const finish = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      Animated.timing(fadeOutAnim, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true
      }).start(() => {
        setVisible(false);
        onFinish?.();
      });
    };

    // Güvenli kapanış garantisi
    timerRef.current = setTimeout(finish, 2600);

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 45,
        useNativeDriver: true
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [replayTrigger]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeOutAnim }]}>
      {/* Gökyüzü ve Güneş */}
      <View style={styles.skyLayer}>
        <View style={styles.sun} />
        <View style={styles.mountainLeft} />
        <View style={styles.mountainRight} />
      </View>

      {/* Toprak Parkur Zemini */}
      <View style={styles.groundLayer}>
        <View style={styles.dirtRoad} />
      </View>

      {/* Orta Marka & Enduro Amblemi */}
      <Animated.View
        style={[
          styles.centerCard,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <View style={styles.logoRing}>
          <Image source={IMAGES.appIcon} style={styles.logoImg} />
        </View>
        <Text style={styles.brandTitle}>ELDİVAN OUTDOOR</Text>
        <Text style={styles.brandSub}>DOĞA & MOTOR SPORLARI KULÜBÜ</Text>
        <View style={styles.badge}>
          <Ionicons name="compass-outline" size={14} color={COLORS.gold} />
          <Text style={styles.badgeText}>1.420M · ÇANKIRI</Text>
        </View>
      </Animated.View>

      {/* Geç Butonu */}
      <TouchableOpacity
        style={styles.skipBtn}
        activeOpacity={0.8}
        onPress={() => {
          if (timerRef.current) clearTimeout(timerRef.current);
          setVisible(false);
          onFinish?.();
        }}
      >
        <Text style={styles.skipText}>Geç</Text>
        <Ionicons name="arrow-forward" size={14} color={COLORS.accent} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    backgroundColor: COLORS.splashBg,
    justifyContent: 'center',
    alignItems: 'center'
  },
  skyLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.48,
    backgroundColor: '#2A4A39',
    overflow: 'hidden'
  },
  sun: {
    position: 'absolute',
    right: '16%',
    top: '28%',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.gold,
    opacity: 0.9
  },
  mountainLeft: {
    position: 'absolute',
    bottom: -40,
    left: -30,
    width: 240,
    height: 150,
    backgroundColor: '#1A3226',
    transform: [{ rotate: '14deg' }]
  },
  mountainRight: {
    position: 'absolute',
    bottom: -50,
    right: -40,
    width: 280,
    height: 165,
    backgroundColor: '#172C21',
    transform: [{ rotate: '-12deg' }]
  },
  groundLayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.52,
    backgroundColor: '#2F5A3E',
    alignItems: 'center'
  },
  dirtRoad: {
    width: '55%',
    height: '100%',
    backgroundColor: '#4F392A',
    opacity: 0.85
  },
  centerCard: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 24,
    borderRadius: 28,
    backgroundColor: 'rgba(20, 32, 26, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)'
  },
  logoRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.forest,
    borderWidth: 2,
    borderColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    overflow: 'hidden'
  },
  logoImg: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  brandTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5
  },
  brandSub: {
    color: 'rgba(245, 242, 234, 0.78)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginTop: 4
  },
  badge: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)'
  },
  badgeText: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '700'
  },
  skipBtn: {
    position: 'absolute',
    top: 52,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.48)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)'
  },
  skipText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700'
  }
});

