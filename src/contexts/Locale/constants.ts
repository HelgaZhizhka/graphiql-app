import enStrings from '@/locales/en.json';
import ruStrings from '@/locales/ru.json';

export const REGIONS = {
  RU: 'RU',
  EN: 'EN',
};

export const LOCALE_STRINGS = {
  [REGIONS.EN]: enStrings,
  [REGIONS.RU]: ruStrings,
};

export const lang = localStorage.getItem('lang') ?? REGIONS.EN;

export const initialState = {
  strings: LOCALE_STRINGS[lang!],
};
