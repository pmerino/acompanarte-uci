import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Card } from '../ui/Card';
import { IconCircle } from '../ui/IconCircle';
import { Typography } from '../ui/Typography';
import { InfoTopic } from '@/data/types';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { MaterialIcons } from '@expo/vector-icons';

interface InfoCardProps {
  topic: InfoTopic;
}

export function InfoCard({ topic }: InfoCardProps) {
  const router = useRouter();
  const { t } = useTranslation('info');

  return (
    <Card
      borderLeftColor={topic.color}
      onPress={() => router.push(`/(tabs)/info/${topic.id}`)}
      style={styles.card}
    >
      <View style={styles.row}>
        <IconCircle
          icon={topic.icon}
          color={topic.color}
          backgroundColor={topic.colorLight}
        />
        <View style={styles.content}>
          <Typography variant="bodyMedium">
            {t(`${topic.id}.name`)}
          </Typography>
        </View>
        <MaterialIcons
          name="chevron-right"
          size={24}
          color={colors.textTertiary}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
});
