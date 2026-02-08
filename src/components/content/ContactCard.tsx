import React from 'react';
import { View, StyleSheet, Linking, Platform } from 'react-native';
import { Card } from '../ui/Card';
import { IconCircle } from '../ui/IconCircle';
import { Typography } from '../ui/Typography';
import { MaterialIconName } from '@/data/types';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface ContactCardProps {
  name: string;
  number: string;
  description: string;
  icon: MaterialIconName;
  available?: string;
}

export function ContactCard({
  name,
  number,
  description,
  icon,
  available,
}: ContactCardProps) {
  const isPhone = /^\d+$/.test(number.replace(/\s/g, ''));

  const handlePress = () => {
    if (isPhone) {
      const phoneUrl = Platform.OS === 'ios' ? `telprompt:${number}` : `tel:${number}`;
      Linking.openURL(phoneUrl);
    }
  };

  return (
    <Card
      onPress={isPhone ? handlePress : undefined}
      borderLeftColor={colors.category.emergency}
      style={styles.card}
    >
      <View style={styles.row}>
        <IconCircle
          icon={icon}
          color={colors.category.emergency}
          backgroundColor="#FCE8E4"
        />
        <View style={styles.content}>
          <Typography variant="bodyMedium">{name}</Typography>
          <Typography variant="smallMedium" color={colors.primary} style={styles.number}>
            {number}
          </Typography>
          <Typography variant="small" color={colors.textSecondary}>
            {description}
          </Typography>
          {available && (
            <Typography variant="caption" color={colors.textTertiary} style={styles.available}>
              {available}
            </Typography>
          )}
        </View>
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
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  number: {
    marginTop: 2,
  },
  available: {
    marginTop: 4,
  },
});
