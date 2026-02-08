import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ContentBlock } from '@/components/layout/ContentBlock';
import { FAQItem } from '@/components/content/FAQItem';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function FAQScreen() {
  const { t } = useTranslation('faq');

  const categories = t('categories', { returnObjects: true }) as Array<{
    name: string;
    questions: Array<{ question: string; answer: string }>;
  }>;

  return (
    <>
      <Stack.Screen options={{ title: t('title') }} />
      <ScreenContainer>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />
        {Array.isArray(categories) && categories.map((category, catIndex) => (
          <ContentBlock key={catIndex} title={category.name}>
            {category.questions.map((q, qIndex) => (
              <FAQItem key={qIndex} question={q.question} answer={q.answer} />
            ))}
          </ContentBlock>
        ))}
      </ScreenContainer>
    </>
  );
}
