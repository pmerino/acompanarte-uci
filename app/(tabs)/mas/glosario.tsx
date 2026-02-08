import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Accordion } from '@/components/ui/Accordion';
import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/spacing';
import { fontFamily } from '@/constants/typography';

export default function GlosarioScreen() {
  const { t } = useTranslation('glossary');
  const [search, setSearch] = useState('');

  const terms = t('terms', { returnObjects: true }) as Array<{
    term: string;
    definition: string;
  }>;

  const filteredTerms = useMemo(() => {
    if (!Array.isArray(terms)) return [];
    if (!search.trim()) return terms;
    const q = search.toLowerCase();
    return terms.filter(
      (item) =>
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q)
    );
  }, [terms, search]);

  return (
    <>
      <Stack.Screen options={{ title: t('title') }} />
      <ScreenContainer>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={20} color={colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={colors.textTertiary}
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
          />
          {search.length > 0 && (
            <MaterialIcons
              name="close"
              size={20}
              color={colors.textTertiary}
              onPress={() => setSearch('')}
            />
          )}
        </View>

        {filteredTerms.map((item, index) => (
          <Accordion key={index} title={item.term}>
            <Typography variant="body" color={colors.textSecondary}>
              {item.definition}
            </Typography>
          </Accordion>
        ))}

        {filteredTerms.length === 0 && (
          <Typography variant="body" color={colors.textTertiary} align="center" style={styles.noResults}>
            No se encontraron resultados
          </Typography>
        )}
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: spacing.xs,
  },
  noResults: {
    marginTop: spacing['2xl'],
  },
});
