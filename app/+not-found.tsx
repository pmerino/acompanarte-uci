import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('notFound.title') }} />
      <View style={styles.container}>
        <MaterialIcons name="search-off" size={64} color={colors.textTertiary} />
        <Typography variant="h2" align="center" style={styles.title}>
          {t('notFound.title')}
        </Typography>
        <Typography
          variant="body"
          color={colors.textSecondary}
          align="center"
          style={styles.message}
        >
          {t('notFound.message')}
        </Typography>
        <Link href="/" style={styles.link}>
          <Typography variant="bodyMedium" color={colors.primary}>
            {t('notFound.goHome')}
          </Typography>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['2xl'],
    backgroundColor: colors.background,
  },
  title: {
    marginTop: spacing.lg,
  },
  message: {
    marginTop: spacing.sm,
  },
  link: {
    marginTop: spacing.xl,
  },
});
