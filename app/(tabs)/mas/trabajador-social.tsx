import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Divider } from '@/components/ui/Divider';
import { ContentBlock } from '@/components/layout/ContentBlock';
import { colors } from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/spacing';

export default function TrabajadorSocialScreen() {
  const { t } = useTranslation('social');

  const services = t('services', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <>
      <Stack.Screen options={{ title: t('title') }} />
      <ScreenContainer>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <View style={styles.introBox}>
          <Typography variant="body" color={colors.textSecondary}>
            {t('intro')}
          </Typography>
        </View>

        <ContentBlock title="Servicios disponibles">
          {Array.isArray(services) && services.map((service, index) => (
            <View key={index}>
              <View style={styles.serviceRow}>
                <MaterialIcons name="check-circle" size={20} color={colors.category.social} style={styles.serviceIcon} />
                <View style={styles.serviceContent}>
                  <Typography variant="bodyMedium">{service.title}</Typography>
                  <Typography variant="small" color={colors.textSecondary} style={styles.serviceDesc}>
                    {service.description}
                  </Typography>
                </View>
              </View>
              {index < services.length - 1 && <Divider />}
            </View>
          ))}
        </ContentBlock>

        <ContentBlock title="Cómo contactar">
          <Typography variant="body" color={colors.textSecondary}>
            {t('howToContact')}
          </Typography>
        </ContentBlock>

        <View style={styles.scheduleBox}>
          <MaterialIcons name="schedule" size={20} color={colors.category.social} />
          <Typography variant="small" color={colors.textSecondary} style={styles.scheduleText}>
            {t('schedule')}
          </Typography>
        </View>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  introBox: {
    backgroundColor: colors.skyLight,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginBottom: spacing.xl,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
  },
  serviceIcon: {
    marginTop: 2,
    marginRight: spacing.md,
  },
  serviceContent: {
    flex: 1,
  },
  serviceDesc: {
    marginTop: 4,
  },
  scheduleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.base,
  },
  scheduleText: {
    marginLeft: spacing.sm,
    flex: 1,
  },
});
