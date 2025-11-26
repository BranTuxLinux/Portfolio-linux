import en from './locales/en.json';
import es from './locales/es.json';

export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const translations = {
  en,
  es,
} as const;

export type Language = keyof typeof translations;

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: string): any {
    const keys = key.split('.');
    let value: any = translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value;
  };
}

export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

