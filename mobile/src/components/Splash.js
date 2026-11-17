import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
  Modal,
  useWindowDimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { IMAGES } from '../data/mockData';

const LANE_DASH = 34;
const LANE_PERIOD = LANE_DASH * 2;
const LANE_DASHES = Array.from({ length: 16 }, (_, i) => i);
const PROGRESS_WIDTH = 210;
const MOTO_SIZE = 38;
const DUST = [0, 1, 2];

export default function Splash({ replayTrigger = 0, onFinish }) {
  const [visible, setVisible] = useState(true);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;
  // Sahne: manzara yükselir, yol akar, logo düşer, yazılar sırayla gelir, çubuk dolar.
  const sceneAnim = useRef(new Animated.Value(0)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;
  const textAnims = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const roadAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);

  useEffect(() => {
    // Not: Burada "bir kez gösterildi" koruması olmamalı; StrictMode efekti iki kez
    // çalıştırır ve ilk temizlik zamanlayıcıyı sildiği için açılış ekranı takılı kalıyordu.
    setVisible(true);
    scaleAnim.setValue(0.85);
    opacityAnim.setValue(0);
    fadeOutAnim.setValue(1);
    sceneAnim.setValue(0);
    logoAnim.setValue(0);
    textAnims.forEach((a) => a.setValue(0));
    progressAnim.setValue(0);
    roadAnim.setValue(0);
    pulseAnim.setValue(0);

    // Sürekli dönen hareketler: akan yol şeritleri ve logo çevresindeki dalga
    const roadLoop = Animated.loop(
      Animated.timing(roadAnim, {
        toValue: 1,
        duration: 420,
        easing: Easing.linear,
        useNativeDriver: true
      })
    );
    const pulseLoop = Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      })
    );
    roadLoop.start();
    pulseLoop.start();

    let closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      setVisible(false);
      onFinish?.();
    };

    const finish = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      Animated.timing(fadeOutAnim, {
        toValue: 0,
        duration: 380,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true
      }).start(close);
      // Animasyon geri çağrısı gelmezse (uygulama arka plandaysa vb.) yine de kapat
      timerRef.current = setTimeout(close, 600);
    };

    // Güvenli kapanış garantisi
    timerRef.current = setTimeout(finish, 2600);

    Animated.parallel([
      Animated.timing(sceneAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2400,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true
      }),
      Animated.sequence([
        Animated.delay(150),
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            tension: 45,
            useNativeDriver: true
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true
          }),
          Animated.spring(logoAnim, {
            toValue: 1,
            friction: 4,
            tension: 55,
            useNativeDriver: true
          })
        ])
      ]),
      Animated.sequence([
        Animated.delay(500),
        Animated.stagger(
          130,
          textAnims.map((a) =>
            Animated.timing(a, {
              toValue: 1,
              duration: 340,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true
            })
          )
        )
      ])
    ]).start();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      roadLoop.stop();
      pulseLoop.stop();
    };
  }, [replayTrigger]);

  // Yazı satırları: aşağıdan yukarı kayarak belirir
  const rise = (a) => ({
    opacity: a,
    transform: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }]
  });
  const pulseRing = (from, to) => ({
    opacity: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] }),
    transform: [{ scale: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [from, to] }) }]
  });

  if (!visible) return null;

  // Modal: açılış ekranı durum çubuğu dahil tüm ekranı kaplasın, gezinme katmanlarının altında kalmasın
  return (
    <Modal
      visible
      transparent
      animationType="none"
      statusBarTranslucent
      navigationBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={() => {}}
    >
    <View style={styles.modalRoot}>
    <StatusBar style="light" />
    <Animated.View
      style={[
        styles.overlay,
        {
          // iOS'ta Modal içeriğinin yüksekliği yoksa absoluteFill çöküyor; boyutu açıkça ver
          width,
          height,
          opacity: fadeOutAnim,
          // Kapanışta sahnenin içinden geçiyormuş gibi hafifçe yaklaş
          transform: [{ scale: fadeOutAnim.interpolate({ inputRange: [0, 1], outputRange: [1.14, 1] }) }]
        }
      ]}
    >
      {/* Gökyüzü ve Güneş */}
      <View style={[styles.skyLayer, { height: height * 0.48 }]}>
        <Animated.View
          style={[
            styles.sunWrap,
            {
              opacity: sceneAnim,
              transform: [{ translateY: sceneAnim.interpolate({ inputRange: [0, 1], outputRange: [90, 0] }) }]
            }
          ]}
        >
          <Animated.View style={[styles.sunGlow, pulseRing(1, 1.9)]} />
          <View style={styles.sun} />
        </Animated.View>
        <Animated.View
          style={[
            styles.mountainLeft,
            {
              transform: [
                { translateY: sceneAnim.interpolate({ inputRange: [0, 1], outputRange: [120, 0] }) },
                { rotate: '14deg' }
              ]
            }
          ]}
        />
        <Animated.View
          style={[
            styles.mountainRight,
            {
              transform: [
                { translateY: sceneAnim.interpolate({ inputRange: [0, 0.25, 1], outputRange: [150, 150, 0] }) },
                { rotate: '-12deg' }
              ]
            }
          ]}
        />
      </View>

      {/* Toprak Parkur Zemini: şeritler sürüş hissi için sürekli akar */}
      <View style={[styles.groundLayer, { height: height * 0.52 }]}>
        <View style={styles.dirtRoad}>
          <Animated.View
            style={[
              styles.laneMarks,
              {
                transform: [
                  { translateY: roadAnim.interpolate({ inputRange: [0, 1], outputRange: [0, LANE_PERIOD] }) }
                ]
              }
            ]}
          >
            {LANE_DASHES.map((i) => (
              <View key={i} style={styles.laneDash} />
            ))}
          </Animated.View>
        </View>
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
        <View style={styles.logoWrap}>
          <Animated.View style={[styles.logoPulse, pulseRing(1, 1.8)]} />
          <Animated.View
            style={[
              styles.logoRing,
              {
                transform: [
                  { scale: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] }) },
                  { rotate: logoAnim.interpolate({ inputRange: [0, 1], outputRange: ['-40deg', '0deg'] }) }
                ]
              }
            ]}
          >
            <Image source={IMAGES.appIcon} style={styles.logoImg} />
          </Animated.View>
        </View>
        <Animated.Text style={[styles.brandTitle, rise(textAnims[0])]}>ELDİVAN OUTDOOR</Animated.Text>
        <Animated.Text style={[styles.brandSub, rise(textAnims[1])]}>DOĞA & MOTOR SPORLARI KULÜBÜ</Animated.Text>
        <Animated.View style={[styles.badge, rise(textAnims[2])]}>
          <Ionicons name="location-outline" size={14} color={COLORS.gold} />
          <Text style={styles.badgeText}>ELDİVAN · ÇANKIRI</Text>
        </Animated.View>
        {/* Motor ilerlemesi: motor çubuk dolarken soldan sağa sürer, arkasında toz bırakır */}
        <View style={styles.rideWrap}>
          <Animated.View
            style={[
              styles.moto,
              {
                transform: [
                  {
                    translateX: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-MOTO_SIZE / 2, PROGRESS_WIDTH - MOTO_SIZE - 4]
                    })
                  },
                  // Toprak yolda sarsılma
                  { translateY: roadAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, -2.5, 0] }) },
                  { rotate: roadAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: ['-4deg', '2deg', '-4deg'] }) }
                ]
              }
            ]}
          >
            {DUST.map((i) => (
              <Animated.View
                key={i}
                style={[
                  styles.dust,
                  {
                    left: -6 - i * 7,
                    width: 8 - i * 2,
                    height: 8 - i * 2,
                    opacity: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.55 - i * 0.15, 0]
                    }),
                    transform: [
                      { translateX: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) },
                      { scale: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1.4] }) }
                    ]
                  }
                ]}
              />
            ))}
            <Image source={IMAGES.motoIcon} style={styles.motoImg} resizeMode="contain" />
          </Animated.View>

          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  transform: [
                    {
                      translateX: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-PROGRESS_WIDTH, 0]
                      })
                    }
                  ]
                }
              ]}
            />
          </View>
          <View style={styles.flag}>
            <Ionicons name="flag" size={16} color={COLORS.gold} />
          </View>
        </View>
        <Animated.Text style={[styles.rideLabel, rise(textAnims[2])]}>Parkura çıkılıyor…</Animated.Text>
      </Animated.View>

      {/* Geç Butonu */}
      <TouchableOpacity
        style={[styles.skipBtn, { top: insets.top + 12 }]}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Açılışı geç"
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
    </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: COLORS.splashBg,
    justifyContent: 'center',
    alignItems: 'center'
  },
  skyLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2A4A39',
    overflow: 'hidden'
  },
  sunWrap: {
    position: 'absolute',
    right: '16%',
    top: '28%',
    width: 72,
    height: 72
  },
  sun: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.gold,
    opacity: 0.9
  },
  sunGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 36,
    backgroundColor: COLORS.gold
  },
  laneMarks: {
    position: 'absolute',
    top: -LANE_PERIOD,
    left: '50%',
    marginLeft: -3,
    width: 6,
    gap: LANE_DASH
  },
  laneDash: {
    height: LANE_DASH,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
    opacity: 0.55
  },
  logoWrap: {
    width: 76,
    height: 76,
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoPulse: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: COLORS.gold
  },
  rideWrap: {
    marginTop: 18,
    width: PROGRESS_WIDTH,
    height: MOTO_SIZE + 8,
    justifyContent: 'flex-end'
  },
  moto: {
    position: 'absolute',
    left: 0,
    bottom: 3,
    width: MOTO_SIZE,
    height: MOTO_SIZE,
    zIndex: 2
  },
  motoImg: {
    width: MOTO_SIZE,
    height: MOTO_SIZE
  },
  dust: {
    position: 'absolute',
    bottom: 4,
    borderRadius: 6,
    backgroundColor: '#C9A27A'
  },
  progressTrack: {
    width: PROGRESS_WIDTH,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.14)',
    overflow: 'hidden'
  },
  progressFill: {
    width: PROGRESS_WIDTH,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.gold
  },
  flag: {
    position: 'absolute',
    right: -10,
    bottom: 4
  },
  rideLabel: {
    marginTop: 8,
    color: 'rgba(245, 242, 234, 0.7)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6
  },
  mountainLeft: {
    position: 'absolute',
    bottom: -40,
    left: -30,
    width: 240,
    height: 150,
    backgroundColor: '#1A3226'
  },
  mountainRight: {
    position: 'absolute',
    bottom: -50,
    right: -40,
    width: 280,
    height: 165,
    backgroundColor: '#172C21'
  },
  groundLayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2F5A3E',
    alignItems: 'center'
  },
  dirtRoad: {
    width: '55%',
    height: '100%',
    backgroundColor: '#4F392A',
    opacity: 0.85,
    overflow: 'hidden'
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
    top: 16,
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

