export interface MainState {
  apiUrl: string;
  code: string;
  variables: string;
  headers: string;
  response: string;
}

export type MainAction =
  | { type: 'SET_API_URL'; payload: string }
  | { type: 'SET_CODE'; payload: string }
  | { type: 'SET_VARIABLES'; payload: string }
  | { type: 'SET_HEADERS'; payload: string }
  | { type: 'SET_RESPONSE'; payload: string }
  | { type: 'PRETTIFY_CODE'; payload: string }
  | { type: 'RESET_DATA' };

export const initialState: MainState = {
  apiUrl: '',
  code: '',
  variables: '',
  headers: '',
  response: '',
};

export const mainReducer = (state: MainState, action: MainAction) => {
  switch (action.type) {
    case 'SET_API_URL':
      return { ...state, apiUrl: action.payload };
    case 'SET_CODE':
      return { ...state, code: action.payload };
    case 'SET_VARIABLES':
      return { ...state, variables: action.payload };
    case 'SET_HEADERS':
      return { ...state, headers: action.payload };
    case 'SET_RESPONSE':
      return { ...state, response: action.payload };
    case 'PRETTIFY_CODE':
      return { ...state, code: action.payload };
    case 'RESET_DATA':
      return { ...initialState };
    default:
      return state;
  }
};
