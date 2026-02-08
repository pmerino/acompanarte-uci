import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import common from './locales/es/common.json';
import conditions from './locales/es/conditions.json';
import devices from './locales/es/devices.json';
import info from './locales/es/info.json';
import help from './locales/es/help.json';
import social from './locales/es/social.json';
import glossary from './locales/es/glossary.json';
import faq from './locales/es/faq.json';
import emergency from './locales/es/emergency.json';
import emotional from './locales/es/emotional.json';

const LANGUAGE_KEY = '@acompanarte_language';

const resources = {
  es: {
    common,
    conditions,
    devices,
    info,
    help,
    social,
    glossary,
    faq,
    emergency,
    emotional,
  },
};

export async function initI18n() {
  let savedLanguage: string | null = null;
  try {
    savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
  } catch {}

  const deviceLocale = getLocales()[0]?.languageCode ?? 'es';
  const language = savedLanguage || (deviceLocale === 'es' ? 'es' : 'es');

  await i18next.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: 'es',
    ns: ['common', 'conditions', 'devices', 'info', 'help', 'social', 'glossary', 'faq', 'emergency', 'emotional'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
  });
}

export async function changeLanguage(lng: string) {
  await i18next.changeLanguage(lng);
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lng);
  } catch {}
}

export default i18next;
