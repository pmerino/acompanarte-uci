import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { ContentBlock } from '@/components/layout/ContentBlock';
import { DetailSection } from '@/components/content/DetailSection';
import { FAQItem } from '@/components/content/FAQItem';
import { IconCircle } from '@/components/ui/IconCircle';
import { Typography } from '@/components/ui/Typography';
import { devices } from '@/data/devices';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function DeviceDetailScreen() {
  const { deviceId } = useLocalSearchParams<{ deviceId: string }>();
  const { t } = useTranslation('devices');

  const device = devices.find((d) => d.id === deviceId);

  if (!device) {
    return (
      <>
        <Stack.Screen options={{ title: '' }} />
        <ScreenContainer>
          <Typography variant="body" color={colors.textSecondary}>
            Dispositivo no encontrado
          </Typography>
        </ScreenContainer>
      </>
    );
  }

  const name = t(`${deviceId}.name`);
  const summary = t(`${deviceId}.summary`);
  const whatIsIt = t(`${deviceId}.whatIsIt`);
  const howItWorks = t(`${deviceId}.howItWorks`);
  const whatYouWillSee = t(`${deviceId}.whatYouWillSee`);
  const importantNotes = t(`${deviceId}.importantNotes`, { returnObjects: true }) as string[];
  const faqs = t(`${deviceId}.faqs`, { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <>
      <Stack.Screen options={{ title: name }} />
      <ScreenContainer>
        <View style={styles.header}>
          <IconCircle
            icon={device.icon}
            color={device.color}
            backgroundColor={device.colorLight}
            size={64}
            iconSize={32}
          />
          <Typography variant="h2" align="center" style={styles.name}>
            {name}
          </Typography>
          <Typography variant="body" color={colors.textSecondary} align="center">
            {summary}
          </Typography>
        </View>

        <DetailSection title="¿Qué es?" content={whatIsIt} accentColor={device.color} />
        <DetailSection title="¿Cómo funciona?" content={howItWorks} accentColor={device.color} />
        <DetailSection title="¿Qué verás?" content={whatYouWillSee} accentColor={device.color} />

        <ContentBlock title="Notas importantes">
          {Array.isArray(importantNotes) && importantNotes.map((note, index) => (
            <View key={index} style={styles.noteRow}>
              <MaterialIcons name="info-outline" size={20} color={device.color} style={styles.noteIcon} />
              <Typography variant="body" color={colors.textSecondary} style={styles.noteText}>
                {note}
              </Typography>
            </View>
          ))}
        </ContentBlock>

        <ContentBlock title="Preguntas frecuentes">
          {Array.isArray(faqs) && faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </ContentBlock>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
    paddingTop: spacing.base,
  },
  name: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  noteIcon: {
    marginTop: 2,
    marginRight: spacing.md,
  },
  noteText: {
    flex: 1,
  },
});
