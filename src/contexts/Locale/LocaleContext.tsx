import { ReactNode, useReducer } from 'react';
import {
  LOCALE_STRINGS,
  LocalState,
  LocaleAction,
  LocaleContext,
  Props,
  initialState,
} from './constants';

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

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = {
    state,
    dispatch,
  };

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};
