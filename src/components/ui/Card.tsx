import React from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { borderRadius, spacing } from '@/constants/spacing';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  borderLeftColor?: string;
  style?: ViewStyle;
}

export function Card({ children, onPress, borderLeftColor, style }: CardProps) {
  const content = (
    <View
      style={[
        styles.card,
        borderLeftColor && { borderLeftWidth: 4, borderLeftColor },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
});
