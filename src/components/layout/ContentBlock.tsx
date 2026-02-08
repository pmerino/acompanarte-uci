import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../ui/Typography';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface ContentBlockProps {
  title?: string;
  children: React.ReactNode;
}

export function ContentBlock({ title, children }: ContentBlockProps) {
  return (
    <View style={styles.container}>
      {title && (
        <Typography variant="h4" style={styles.title}>
          {title}
        </Typography>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
});
