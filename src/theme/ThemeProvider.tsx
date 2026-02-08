import React, { createContext, useContext } from 'react';
import { colors } from '@/constants/colors';
import { textStyles, fontFamily, fontSize, lineHeight } from '@/constants/typography';
import { spacing, borderRadius, iconSize } from '@/constants/spacing';

const theme = {
  colors,
  textStyles,
  fontFamily,
  fontSize,
  lineHeight,
  spacing,
  borderRadius,
  iconSize,
} as const;

export type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
