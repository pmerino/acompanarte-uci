import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { DeviceCard } from '@/components/content/DeviceCard';
import { devices } from '@/data/devices';

export default function DispositivosScreen() {
  const { t } = useTranslation('devices');
  return (
    <>
      <Stack.Screen options={{ title: t('title') }} />
      <ScreenContainer>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </ScreenContainer>
    </>
  );
}
