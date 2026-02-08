import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { IconCircle } from '@/components/ui/IconCircle';
import { Typography } from '@/components/ui/Typography';
import { Accordion } from '@/components/ui/Accordion';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { MaterialIconName } from '@/data/types';

export default function AyudarScreen() {
  const { t } = useTranslation('help');

  const sections = t('sections', { returnObjects: true }) as Array<{
    id: string;
    title: string;
    icon: MaterialIconName;
    content: string;
  }>;

  return (
    <>
      <Stack.Screen options={{ title: t('title') }} />
      <ScreenContainer>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />
        {Array.isArray(sections) && sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Accordion title={section.title}>
              <Typography variant="body" color={colors.textSecondary}>
                {section.content}
              </Typography>
            </Accordion>
          </View>
        ))}
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.xs,
  },
});
