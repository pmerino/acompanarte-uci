import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Card } from '../ui/Card';
import { IconCircle } from '../ui/IconCircle';
import { Typography } from '../ui/Typography';
import { Condition } from '@/data/types';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { MaterialIcons } from '@expo/vector-icons';

interface ConditionCardProps {
  condition: Condition;
}

export function ConditionCard({ condition }: ConditionCardProps) {
  const router = useRouter();
  const { t } = useTranslation('conditions');

  return (
    <Card
      borderLeftColor={condition.color}
      onPress={() => router.push(`/(tabs)/patologias/${condition.id}`)}
      style={styles.card}
    >
      <View style={styles.row}>
        <IconCircle
          icon={condition.icon}
          color={condition.color}
          backgroundColor={condition.colorLight}
        />
        <View style={styles.content}>
          <Typography variant="bodyMedium" numberOfLines={2}>
            {t(`${condition.id}.name`)}
          </Typography>
          <Typography
            variant="small"
            color={colors.textSecondary}
            numberOfLines={2}
            style={styles.summary}
          >
            {t(`${condition.id}.summary`)}
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
  summary: {
    marginTop: 2,
  },
});
