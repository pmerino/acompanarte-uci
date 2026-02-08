import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Card } from '../ui/Card';
import { IconCircle } from '../ui/IconCircle';
import { Typography } from '../ui/Typography';
import { Device } from '@/data/types';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { MaterialIcons } from '@expo/vector-icons';

interface DeviceCardProps {
  device: Device;
}

export function DeviceCard({ device }: DeviceCardProps) {
  const router = useRouter();
  const { t } = useTranslation('devices');

  return (
    <Card
      borderLeftColor={device.color}
      onPress={() => router.push(`/(tabs)/dispositivos/${device.id}`)}
      style={styles.card}
    >
      <View style={styles.row}>
        <IconCircle
          icon={device.icon}
          color={device.color}
          backgroundColor={device.colorLight}
        />
        <View style={styles.content}>
          <Typography variant="bodyMedium" numberOfLines={2}>
            {t(`${device.id}.name`)}
          </Typography>
          <Typography
            variant="small"
            color={colors.textSecondary}
            numberOfLines={2}
            style={styles.summary}
          >
            {t(`${device.id}.summary`)}
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
