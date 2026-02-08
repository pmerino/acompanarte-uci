import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { IconCircle } from '@/components/ui/IconCircle';
import { colors } from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/spacing';

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

  return (
    <ScreenContainer>
      {/* Hero / Welcome */}
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <MaterialIcons name="favorite" size={32} color={colors.primary} />
        </View>
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
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
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
});
