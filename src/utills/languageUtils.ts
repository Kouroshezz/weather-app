import type { i18n } from 'i18next';

export const applyLanguageSettings = (lang: string, i18nInstance: i18n): void => {
  document.documentElement.lang = lang;
  document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';
  i18nInstance.changeLanguage(lang);
};