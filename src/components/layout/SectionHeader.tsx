import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../ui/Typography';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Typography variant="h2" color={colors.textPrimary}>
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body"
          color={colors.textSecondary}
          style={styles.subtitle}
        >
          {subtitle}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
});
