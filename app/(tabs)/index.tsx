import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { IconCircle } from '@/components/ui/IconCircle';
import { useLanguage } from '@/hooks/useLanguage';
import { colors } from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/spacing';

const BANNER_DISMISSED_KEY = '@acompanarte_lang_banner_dismissed';

const quickAccessSections = [
  {
    key: 'conditions',
    route: '/(tabs)/patologias',
    icon: 'local-hospital' as const,
    color: colors.category.conditions,
    colorLight: colors.primaryLight,
  },
  {
    key: 'devices',
    route: '/(tabs)/dispositivos',
    icon: 'monitor-heart' as const,
    color: colors.category.devices,
    colorLight: colors.sageLight,
  },
  {
    key: 'info',
    route: '/(tabs)/info',
    icon: 'info-outline' as const,
    color: colors.category.info,
    colorLight: colors.peachLight,
  },
  {
    key: 'help',
    route: '/(tabs)/mas/ayudar',
    icon: 'volunteer-activism' as const,
    color: colors.category.help,
    colorLight: colors.lavenderLight,
  },
  {
    key: 'emotional',
    route: '/(tabs)/mas/apoyo-emocional',
    icon: 'spa' as const,
    color: colors.category.emotional,
    colorLight: colors.lavenderLight,
  },
  {
    key: 'faq',
    route: '/(tabs)/mas/faq',
    icon: 'help-outline' as const,
    color: colors.category.faq,
    colorLight: colors.primaryLight,
  },
];

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { currentLanguage, setLanguage } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [suggestedLang, setSuggestedLang] = useState<string | null>(null);

  useEffect(() => {
    async function checkLanguageSuggestion() {
      const dismissed = await AsyncStorage.getItem(BANNER_DISMISSED_KEY).catch(() => null);
      if (dismissed) return;
      const deviceLang = getLocales()[0]?.languageCode ?? 'es';
      if (deviceLang === 'en' && currentLanguage !== 'en') {
        setSuggestedLang('en');
        setShowBanner(true);
      } else if (deviceLang === 'es' && currentLanguage !== 'es') {
        setSuggestedLang('es');
        setShowBanner(true);
      }
    }
    checkLanguageSuggestion();
  }, [currentLanguage]);

  const acceptSuggestion = async () => {
    if (suggestedLang) await setLanguage(suggestedLang);
    setShowBanner(false);
    await AsyncStorage.setItem(BANNER_DISMISSED_KEY, 'true').catch(() => {});
  };

  const dismissBanner = async () => {
    setShowBanner(false);
    await AsyncStorage.setItem(BANNER_DISMISSED_KEY, 'true').catch(() => {});
  };

  return (
    <ScreenContainer>
      {/* Language suggestion banner */}
      {showBanner && (
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <MaterialIcons name="translate" size={20} color={colors.primary} />
            <Typography variant="body" style={styles.bannerText}>
              {suggestedLang === 'en'
                ? 'Would you like to use this app in English?'
                : '¿Quieres usar esta app en español?'}
            </Typography>
          </View>
          <View style={styles.bannerActions}>
            <Pressable onPress={acceptSuggestion} style={styles.bannerButton}>
              <Typography variant="smallMedium" color={colors.primary}>
                {suggestedLang === 'en' ? 'Yes, switch' : 'Sí, cambiar'}
              </Typography>
            </Pressable>
            <Pressable onPress={dismissBanner} style={styles.bannerDismiss}>
              <MaterialIcons name="close" size={18} color={colors.textTertiary} />
            </Pressable>
          </View>
        </View>
      )}

      {/* Logos + Heart */}
      <View style={styles.logosRow}>
        <Image
          source={require('../../assets/logo-sacyl.png')}
          style={styles.logoSacyl}
          resizeMode="contain"
        />
        <View style={styles.heroIcon}>
          <MaterialIcons name="favorite" size={32} color={colors.primary} />
        </View>
        <Image
          source={require('../../assets/logo-uci.jpg')}
          style={styles.logoUci}
          resizeMode="contain"
        />
      </View>

      {/* Hero / Welcome */}
      <View style={styles.hero}>
        <Typography variant="h1" align="center" style={styles.welcome}>
          {t('home.welcome')}
        </Typography>
        <Typography
          variant="h4"
          color={colors.primary}
          align="center"
          style={styles.appName}
        >
          {t('appName')}
        </Typography>
        <Typography
          variant="body"
          color={colors.textSecondary}
          align="center"
          style={styles.subtitle}
        >
          {t('home.subtitle')}
        </Typography>
      </View>

      {/* Description */}
      <View style={styles.descriptionBox}>
        <Typography variant="body" color={colors.textSecondary} align="center">
          {t('home.description')}
        </Typography>
      </View>

      {/* Quick Access */}
      <Typography variant="h3" style={styles.sectionTitle}>
        {t('navigation.seeAll')}
      </Typography>

      <View style={styles.grid}>
        {quickAccessSections.map((section) => (
          <View key={section.key} style={styles.gridItem}>
            <Card
              onPress={() => router.push(section.route as any)}
              style={styles.sectionCard}
            >
              <View style={styles.sectionCardContent}>
                <IconCircle
                  icon={section.icon}
                  color={section.color}
                  backgroundColor={section.colorLight}
                  size={56}
                  iconSize={28}
                />
                <Typography
                  variant="smallMedium"
                  align="center"
                  style={styles.sectionLabel}
                  numberOfLines={2}
                >
                  {t(`home.sections.${section.key}.title`)}
                </Typography>
                <Typography
                  variant="caption"
                  color={colors.textTertiary}
                  align="center"
                  numberOfLines={2}
                >
                  {t(`home.sections.${section.key}.description`)}
                </Typography>
              </View>
            </Card>
          </View>
        ))}
      </View>

      {/* Encouragement */}
      <View style={styles.encouragement}>
        <MaterialIcons
          name="people"
          size={24}
          color={colors.sage}
          style={styles.encouragementIcon}
        />
        <Typography
          variant="body"
          color={colors.textSecondary}
          align="center"
        >
          {t('home.encouragement')}
        </Typography>
      </View>

      {/* Language selector */}
      <View style={styles.langSelector}>
        <MaterialIcons name="translate" size={16} color={colors.textTertiary} />
        <Pressable
          onPress={() => setLanguage('es')}
          style={[styles.langOption, currentLanguage === 'es' && styles.langOptionActive]}
        >
          <Typography
            variant="caption"
            color={currentLanguage === 'es' ? colors.primary : colors.textTertiary}
          >
            Español
          </Typography>
        </Pressable>
        <Typography variant="caption" color={colors.textTertiary}>|</Typography>
        <Pressable
          onPress={() => setLanguage('en')}
          style={[styles.langOption, currentLanguage === 'en' && styles.langOptionActive]}
        >
          <Typography
            variant="caption"
            color={currentLanguage === 'en' ? colors.primary : colors.textTertiary}
          >
            English
          </Typography>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  logosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  // SACYL: 483x219 → ratio 2.2:1
  logoSacyl: {
    height: 54,
    width: 119,
  },
  // UCI: 653x415 → ratio 1.57:1
  logoUci: {
    height: 58,
    width: 91,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  welcome: {
    marginBottom: spacing.xs,
  },
  appName: {
    marginBottom: spacing.sm,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  descriptionBox: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.base,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  gridItem: {
    width: '50%',
    padding: spacing.xs,
  },
  sectionCard: {
    minHeight: 140,
  },
  sectionCardContent: {
    alignItems: 'center',
  },
  sectionLabel: {
    marginTop: spacing.sm,
    marginBottom: 2,
  },
  encouragement: {
    marginTop: spacing.xl,
    backgroundColor: colors.sageLight,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  encouragementIcon: {
    marginBottom: spacing.sm,
  },
  banner: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  bannerText: {
    flex: 1,
  },
  bannerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bannerButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  bannerDismiss: {
    padding: spacing.xs,
  },
  langSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  langOption: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  langOptionActive: {
    backgroundColor: colors.primaryLight,
  },
});
