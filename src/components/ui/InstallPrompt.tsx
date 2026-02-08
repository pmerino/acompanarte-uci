import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { fontFamily, fontSize, lineHeight } from '@/constants/typography';
import { spacing, borderRadius } from '@/constants/spacing';

const STORAGE_KEY = 'pwa_install_dismissed';

function isStandalone(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  if ((window.navigator as any).standalone === true) return true;
  if (window.matchMedia?.('(display-mode: standalone)').matches) return true;
  return false;
}

function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
}

function wasDismissed(): boolean {
  try {
    return !!localStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
}

export default function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [iosDevice] = useState(() =>
    Platform.OS === 'web' && typeof window !== 'undefined' ? isIOS() : false
  );

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    if (isStandalone() || wasDismissed()) return;

    const handler = (e: Event) => {
      e.preventDefault();
      if (wasDismissed()) return;
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // iOS: no native event, show after delay
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isIOS()) {
      timer = setTimeout(() => {
        if (!wasDismissed()) setVisible(true);
      }, 1500);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
  }, []);

  const handleInstall = useCallback(async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
      } catch {}
      setDeferredPrompt(null);
    }
    dismiss();
  }, [deferredPrompt, dismiss]);

  if (!visible || Platform.OS !== 'web') return null;

  const { width } = Dimensions.get('window');
  const cardWidth = Math.min(width - 48, 380);

  // Use inline web styles for position:fixed since RNW doesn't support it
  return (
    <View
      style={{
        position: 'absolute' as any,
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(26, 43, 60, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: 24,
      }}
      // @ts-ignore web-only
      dataSet={{ testid: 'install-overlay' }}
    >
      {/* Backdrop tap to dismiss */}
      <Pressable
        style={{
          position: 'absolute' as any,
          top: 0, left: 0, right: 0, bottom: 0,
        }}
        onPress={dismiss}
      />

      <View style={[styles.card, { width: cardWidth }]}>
        {/* Close */}
        <Pressable
          style={styles.closeBtn}
          onPress={dismiss}
          accessibilityLabel="Cerrar"
          accessibilityRole="button"
          hitSlop={12}
        >
          <MaterialIcons name="close" size={22} color={colors.textTertiary} />
        </Pressable>

        <View style={styles.iconCircle}>
          <MaterialIcons name="add-to-home-screen" size={36} color={colors.primary} />
        </View>

        <Text style={styles.title}>Accede más rápido</Text>

        <Text style={styles.description}>
          Añade Acompañarte UCI a tu pantalla de inicio para acceder con un solo toque, sin necesidad de buscar en el navegador.
        </Text>

        {iosDevice ? (
          <View style={styles.iosInstructions}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>
                Pulsa el icono{' '}
                <MaterialIcons name="ios-share" size={18} color={colors.primary} />
                {' '}de compartir en la barra inferior
              </Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>
                Selecciona "Añadir a pantalla de inicio"
              </Text>
            </View>
            <Pressable style={styles.btnPrimary} onPress={dismiss} accessibilityRole="button">
              <Text style={styles.btnPrimaryText}>Entendido</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.actions}>
            <Pressable style={styles.btnPrimary} onPress={handleInstall} accessibilityRole="button">
              <MaterialIcons name="download" size={20} color="#fff" />
              <Text style={styles.btnPrimaryText}>Añadir a inicio</Text>
            </Pressable>
            <Pressable style={styles.btnSecondary} onPress={dismiss} accessibilityRole="button">
              <Text style={styles.btnSecondaryText}>Ahora no</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    paddingTop: spacing['2xl'],
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    padding: spacing.xs,
    zIndex: 1,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  iosInstructions: {
    width: '100%',
    gap: spacing.md,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.sm,
    color: '#fff',
  },
  stepText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: colors.textPrimary,
  },
  actions: {
    width: '100%',
    gap: spacing.md,
    alignItems: 'center',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    width: '100%',
    paddingVertical: 14,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
  },
  btnPrimaryText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.base,
    color: '#fff',
  },
  btnSecondary: {
    paddingVertical: spacing.sm,
  },
  btnSecondaryText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textTertiary,
  },
});
