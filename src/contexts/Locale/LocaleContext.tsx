import React, { ReactNode, useReducer } from 'react';
import {
  LOCALE_STRINGS,
  LocalState,
  LocaleAction,
  LocaleContext,
  Props,
  REGIONS,
  initialState,
} from './constants';

const reducer = (state: LocalState, action: LocaleAction) => {
  switch (action.type) {
    case 'CHANGE_LOCALE': {
      return {
        ...state,
        strings: LOCALE_STRINGS[action.payload.region],
      };
    }
    case 'RESET_LOCALE': {
      return {
        ...state,
        strings: LOCALE_STRINGS[REGIONS.EN],
      };
    }
    default:
      return state;
  }
};

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = {
    state,
    dispatch,
  };

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};
