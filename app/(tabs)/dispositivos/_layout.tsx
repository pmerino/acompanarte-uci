import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { colors } from '@/constants/colors';
import { fontFamily } from '@/constants/typography';

export default function DispositivosLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: {
          fontFamily: fontFamily.semiBold,
          fontSize: 18,
          color: colors.textPrimary,
        },
        headerShadowVisible: false,
        headerTintColor: colors.primary,
        headerBackTitle: t('navigation.back'),
      }}
    />
  );
}
