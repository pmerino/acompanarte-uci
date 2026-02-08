import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { spacing, borderRadius } from '@/constants/spacing';

interface BadgeProps {
  text: string;
  color: string;
  backgroundColor: string;
}

export function Badge({ text, color, backgroundColor }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Typography variant="caption" color={color}>
        {text}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
});
