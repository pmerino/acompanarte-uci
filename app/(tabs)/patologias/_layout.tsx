import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';

export default function PatologiasLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.primary,
      }}
    />
  );
}
