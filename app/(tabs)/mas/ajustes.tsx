import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Divider } from '@/components/ui/Divider';
import { ContentBlock } from '@/components/layout/ContentBlock';
import { useLanguage } from '@/hooks/useLanguage';
import { colors } from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/spacing';

export default function AjustesScreen() {
  const { t } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguage();

  const languages = [
    { code: 'es', label: t('settings.spanish'), flag: '🇪🇸' },
    { code: 'en', label: t('settings.english'), flag: '🇬🇧' },
  ];

  return (
    <>
      <Stack.Screen options={{ title: t('settings.title') }} />
      <ScreenContainer>
        <SectionHeader title={t('settings.title')} />

        <ContentBlock title={t('settings.language')}>
          <Card>
            {languages.map((lang, index) => (
              <View key={lang.code}>
                <Pressable
                  style={styles.languageRow}
                  onPress={() => setLanguage(lang.code)}
                >
                  <Typography variant="body" style={styles.flag}>
                    {lang.flag}
                  </Typography>
                  <Typography variant="body" style={styles.langLabel}>
                    {lang.label}
                  </Typography>
                  {currentLanguage === lang.code && (
                    <MaterialIcons name="check-circle" size={24} color={colors.primary} />
                  )}
                </Pressable>
                {index < languages.length - 1 && <Divider marginVertical={0} />}
              </View>
            ))}
          </Card>
        </ContentBlock>

        <ContentBlock title={t('settings.about')}>
          <Card>
            <Typography variant="body" color={colors.textSecondary}>
              {t('settings.aboutText')}
            </Typography>
            <View style={styles.versionRow}>
              <Typography variant="small" color={colors.textTertiary}>
                {t('settings.version')} 1.0.0
              </Typography>
            </View>
          </Card>
        </ContentBlock>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  flag: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  langLabel: {
    flex: 1,
  },
  versionRow: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
});
