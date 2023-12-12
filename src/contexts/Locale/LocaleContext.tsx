import { createContext, ReactNode, useReducer } from 'react';

import { LOCALE_STRINGS, initialState } from './constants';

type Props = {
  children: React.ReactNode;
};

type LocalState = typeof initialState;

export interface LocaleAction {
  type: string;
  payload: { region: string };
}

interface LocaleContextType {
  state: LocalState;
  dispatch: React.Dispatch<LocaleAction>;
}

const reducer = (state: LocalState, action: LocaleAction) => {
  switch (action.type) {
    case 'CHANGE_LOCALE': {
      localStorage.setItem('lang', action.payload.region);
      return {
        ...state,
        strings: LOCALE_STRINGS[action.payload.region],
      };
    }
    default:
      return state;
  }
};

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = {
    state,
    dispatch,
  };

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};
