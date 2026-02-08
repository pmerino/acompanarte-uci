import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { textStyles } from '@/constants/typography';
import { colors } from '@/constants/colors';

type Variant = keyof typeof textStyles;

interface TypographyProps extends TextProps {
  variant?: Variant;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export function Typography({
  variant = 'body',
  color = colors.textPrimary,
  align = 'left',
  style,
  ...props
}: TypographyProps) {
  return (
    <Text
      style={[textStyles[variant], { color, textAlign: align }, style]}
      {...props}
    />
  );
}
