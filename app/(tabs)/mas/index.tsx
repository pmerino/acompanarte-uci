import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { IconCircle } from '@/components/ui/IconCircle';
import { Typography } from '@/components/ui/Typography';
import { moreMenuItems } from '@/data/moreMenu';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function MasScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: t('more.title') }} />
      <ScreenContainer>
        <SectionHeader title={t('more.title')} />
        {moreMenuItems.map((item) => (
          <Card
            key={item.id}
            borderLeftColor={item.color}
            onPress={() => router.push(item.route as any)}
            style={styles.card}
          >
            <View style={styles.row}>
              <IconCircle
                icon={item.icon}
                color={item.color}
                backgroundColor={item.colorLight}
              />
              <View style={styles.content}>
                <Typography variant="bodyMedium">
                  {t(item.titleKey)}
                </Typography>
                <Typography variant="small" color={colors.textSecondary} style={styles.description}>
                  {t(item.descriptionKey)}
                </Typography>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.textTertiary} />
            </View>
          </Card>
        ))}
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
  description: {
    marginTop: 2,
  },
});
