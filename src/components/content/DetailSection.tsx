import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../ui/Typography';
import { colors } from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/spacing';

interface DetailSectionProps {
  title: string;
  content: string;
  accentColor?: string;
}

export function DetailSection({
  title,
  content,
  accentColor = colors.primary,
}: DetailSectionProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.titleBar, { backgroundColor: accentColor }]} />
      <Typography variant="h4" style={styles.title}>
        {title}
      </Typography>
      <Typography variant="body" color={colors.textSecondary}>
        {content}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  titleBar: {
    width: 40,
    height: 3,
    borderRadius: 2,
    marginBottom: spacing.sm,
  },
  title: {
    marginBottom: spacing.sm,
  },
});
