import { createContext } from 'react';
import enStrings from '../../locales/en.json';
import ruStrings from '../../locales/ru.json';

export const REGIONS = {
  RU: 'RU',
  EN: 'EN',
};

export const LOCALE_STRINGS = {
  [REGIONS.EN]: enStrings,
  [REGIONS.RU]: ruStrings,
};

export interface LocaleAction {
  type: string;
  payload: { region: string };
}

export type LocalState = typeof initialState;

export type Props = {
  children: React.ReactNode;
};

export const initialState = {
  strings: LOCALE_STRINGS[REGIONS.EN],
};

export interface LocaleContextType {
  state: LocalState;
  dispatch: React.Dispatch<LocaleAction>;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);
