import enStrings from '@/locales/en.json';
import ruStrings from '@/locales/ru.json';
import errorsEn from '@/locales/errorsEn.json';
import errorsRu from '@/locales/errorsRu.json';

export const REGIONS = {
  RU: 'RU',
  EN: 'EN',
};

export const LOCALE_STRINGS = {
  [REGIONS.EN]: { ...enStrings, ...errorsEn },
  [REGIONS.RU]: { ...ruStrings, ...errorsRu },
};

export const getLang = () => localStorage.getItem('lang') ?? REGIONS.EN;
export const lang = getLang();

export const initialState = {
  strings: LOCALE_STRINGS[lang],
};

export type vocab = typeof initialState.strings;
