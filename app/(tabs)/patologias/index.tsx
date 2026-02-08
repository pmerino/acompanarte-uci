import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ConditionCard } from '@/components/content/ConditionCard';
import { conditions } from '@/data/conditions';

export default function PatologiasScreen() {
  const { t } = useTranslation('conditions');
  return (
    <>
      <Stack.Screen options={{ title: t('title') }} />
      <ScreenContainer>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />
        {conditions.map((condition) => (
          <ConditionCard key={condition.id} condition={condition} />
        ))}
      </ScreenContainer>
    </>
  );
}
