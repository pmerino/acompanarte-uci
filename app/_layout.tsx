import React, { useEffect, useState, useCallback } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { ThemeProvider } from '@/theme';
import { initI18n } from '@/i18n';
import { colors } from '@/constants/colors';
import InstallPrompt from '@/components/ui/InstallPrompt';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Inter_400Regular: require('@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf'),
          Inter_500Medium: require('@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf'),
          Inter_600SemiBold: require('@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf'),
          Inter_700Bold: require('@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf'),
        });
      } catch (e) {
        console.warn('Font loading failed:', e);
      }

      try {
        await initI18n();
      } catch (e) {
        console.warn('i18n init failed:', e);
      }

      setAppReady(true);
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        />
        <InstallPrompt />
      </ThemeProvider>
    </View>
  );
}
