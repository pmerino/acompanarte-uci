import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';

export default function DispositivosLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.primary,
      }}
    />
  );
}
