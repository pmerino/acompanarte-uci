import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { ContentBlock } from '@/components/layout/ContentBlock';
import { DetailSection } from '@/components/content/DetailSection';
import { FAQItem } from '@/components/content/FAQItem';
import { IconCircle } from '@/components/ui/IconCircle';
import { Typography } from '@/components/ui/Typography';
import { conditions } from '@/data/conditions';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function ConditionDetailScreen() {
  const { conditionId } = useLocalSearchParams<{ conditionId: string }>();
  const { t } = useTranslation('conditions');

  const condition = conditions.find((c) => c.id === conditionId);

  if (!condition) {
    return (
      <>
        <Stack.Screen options={{ title: '' }} />
        <ScreenContainer>
          <Typography variant="body" color={colors.textSecondary}>
            Condición no encontrada
          </Typography>
        </ScreenContainer>
      </>
    );
  }

  const name = t(`${conditionId}.name`);
  const summary = t(`${conditionId}.summary`);
  const whatIsIt = t(`${conditionId}.whatIsIt`);
  const whatToExpect = t(`${conditionId}.whatToExpect`);
  const treatments = t(`${conditionId}.commonTreatments`, { returnObjects: true }) as string[];
  const faqs = t(`${conditionId}.faqs`, { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <>
      <Stack.Screen options={{ title: name }} />
      <ScreenContainer>
        {/* Header */}
        <View style={styles.header}>
          <IconCircle
            icon={condition.icon}
            color={condition.color}
            backgroundColor={condition.colorLight}
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

        {/* What is it */}
        <DetailSection
          title="¿Qué es?"
          content={whatIsIt}
          accentColor={condition.color}
        />

        {/* What to expect */}
        <DetailSection
          title="¿Qué esperar?"
          content={whatToExpect}
          accentColor={condition.color}
        />

        {/* Treatments */}
        <ContentBlock title="Tratamientos habituales">
          {Array.isArray(treatments) && treatments.map((treatment, index) => (
            <View key={index} style={styles.treatmentRow}>
              <View style={[styles.bullet, { backgroundColor: condition.color }]} />
              <Typography variant="body" color={colors.textSecondary} style={styles.treatmentText}>
                {treatment}
              </Typography>
            </View>
          ))}
        </ContentBlock>

        {/* FAQs */}
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
  treatmentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 8,
    marginRight: spacing.md,
  },
  treatmentText: {
    flex: 1,
  },
});
