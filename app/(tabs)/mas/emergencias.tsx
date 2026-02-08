import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ContentBlock } from '@/components/layout/ContentBlock';
import { ContactCard } from '@/components/content/ContactCard';
import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/spacing';
import { MaterialIconName } from '@/data/types';

export default function EmergenciasScreen() {
  const { t } = useTranslation('emergency');

  const contacts = t('contacts', { returnObjects: true }) as Array<{
    name: string;
    number: string;
    description: string;
    icon: MaterialIconName;
    available?: string;
  }>;

  return (
    <>
      <Stack.Screen options={{ title: t('title') }} />
      <ScreenContainer>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <View style={styles.noteBox}>
          <Typography variant="body" color={colors.textSecondary}>
            {t('importantNote')}
          </Typography>
        </View>

        {Array.isArray(contacts) && contacts.map((contact, index) => (
          <ContactCard
            key={index}
            name={contact.name}
            number={contact.number}
            description={contact.description}
            icon={contact.icon}
            available={contact.available}
          />
        ))}

        <ContentBlock title="¿Cuándo llamar?">
          <Typography variant="body" color={colors.textSecondary}>
            {t('whenToCall')}
          </Typography>
        </ContentBlock>

        <ContentBlock title="Fuera del horario de visitas">
          <Typography variant="body" color={colors.textSecondary}>
            {t('afterHours')}
          </Typography>
        </ContentBlock>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  noteBox: {
    backgroundColor: '#FCE8E4',
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginBottom: spacing.xl,
  },
});
