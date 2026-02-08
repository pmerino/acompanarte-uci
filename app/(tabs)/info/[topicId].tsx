import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { IconCircle } from '@/components/ui/IconCircle';
import { Typography } from '@/components/ui/Typography';
import { infoTopics } from '@/data/infoTopics';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function InfoDetailScreen() {
  const { topicId } = useLocalSearchParams<{ topicId: string }>();
  const { t } = useTranslation('info');

  const topic = infoTopics.find((tp) => tp.id === topicId);

  if (!topic) {
    return (
      <>
        <Stack.Screen options={{ title: '' }} />
        <ScreenContainer>
          <Typography variant="body" color={colors.textSecondary}>
            Información no encontrada
          </Typography>
        </ScreenContainer>
      </>
    );
  }

  const name = t(`${topicId}.name`);
  const content = t(`${topicId}.content`);

  return (
    <>
      <Stack.Screen options={{ title: name }} />
      <ScreenContainer>
        <View style={styles.header}>
          <IconCircle
            icon={topic.icon}
            color={topic.color}
            backgroundColor={topic.colorLight}
            size={64}
            iconSize={32}
          />
          <Typography variant="h2" align="center" style={styles.name}>
            {name}
          </Typography>
        </View>

        <Typography variant="body" color={colors.textSecondary} style={styles.content}>
          {content}
        </Typography>
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
  },
  content: {
    lineHeight: 26,
  },
});
