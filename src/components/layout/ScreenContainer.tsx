import React from 'react';
import { ScrollView, View, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  padded?: boolean;
}

export function ScreenContainer({
  children,
  scrollable = true,
  style,
  padded = true,
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();

  if (scrollable) {
    return (
      <ScrollView
        style={[styles.container, style]}
        contentContainerStyle={[
          padded && styles.padded,
          { paddingBottom: insets.bottom + spacing['2xl'] },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.container,
        padded && styles.padded,
        { paddingBottom: insets.bottom + spacing['2xl'] },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padded: {
    padding: spacing.base,
  },
});
