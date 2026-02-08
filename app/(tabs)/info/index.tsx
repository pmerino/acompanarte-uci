import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { InfoCard } from '@/components/content/InfoCard';
import { infoTopics } from '@/data/infoTopics';

export default function InfoScreen() {
  const { t } = useTranslation('info');
  return (
    <>
      <Stack.Screen options={{ title: t('title') }} />
      <ScreenContainer>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />
        {infoTopics.map((topic) => (
          <InfoCard key={topic.id} topic={topic} />
        ))}
      </ScreenContainer>
    </>
  );
}
