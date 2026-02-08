import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { changeLanguage } from '@/i18n';

export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const setLanguage = useCallback(async (lng: string) => {
    await changeLanguage(lng);
  }, []);

  return {
    currentLanguage,
    setLanguage,
    isSpanish: currentLanguage === 'es',
    isEnglish: currentLanguage === 'en',
  };
}
