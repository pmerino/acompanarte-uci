import React, { useState } from 'react';
import { View, Pressable, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography } from './Typography';
import { colors } from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/spacing';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={toggle}
        style={styles.header}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <Typography variant="bodyMedium" style={styles.title}>
          {title}
        </Typography>
        <MaterialIcons
          name={isOpen ? 'expand-less' : 'expand-more'}
          size={24}
          color={colors.textSecondary}
        />
      </Pressable>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.base,
  },
  title: {
    flex: 1,
    marginRight: spacing.sm,
  },
  content: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.base,
  },
});
