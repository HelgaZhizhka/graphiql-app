import '@testing-library/jest-dom';

import { mainReducer, initialState } from './MainReducer';

describe('MainReducer', () => {
  it('should handle SET_API_URL', () => {
    const previousState = initialState;
    const newState = mainReducer(previousState, { type: 'SET_API_URL', payload: 'newUrl' });
    expect(newState.apiUrl).toBe('newUrl');
  });

  it('should handle SET_CODE', () => {
    const previousState = initialState;
    const newState = mainReducer(previousState, { type: 'SET_CODE', payload: 'newCode' });
    expect(newState.code).toBe('newCode');
  });

  it('should handle SET_VARIABLES', () => {
    const previousState = initialState;
    const newState = mainReducer(previousState, { type: 'SET_VARIABLES', payload: 'newVariables' });
    expect(newState.variables).toBe('newVariables');
  });

  it('should handle SET_HEADERS', () => {
    const previousState = initialState;
    const newState = mainReducer(previousState, { type: 'SET_HEADERS', payload: 'newHeaders' });
    expect(newState.headers).toBe('newHeaders');
  });

  it('should handle SET_RESPONSE', () => {
    const previousState = initialState;
    const newState = mainReducer(previousState, { type: 'SET_RESPONSE', payload: 'newResponse' });
    expect(newState.response).toBe('newResponse');
  });

  it('should handle PRETTIFY_CODE', () => {
    const previousState = initialState;
    const newState = mainReducer(previousState, {
      type: 'PRETTIFY_CODE',
      payload: 'prettifiedCode',
    });
    expect(newState.code).toBe('prettifiedCode');
  });

  it('should handle RESET_DATA', () => {
    const modifiedState = { ...initialState, code: 'someCode', apiUrl: 'someUrl' };
    const newState = mainReducer(modifiedState, { type: 'RESET_DATA' });
    expect(newState).toEqual(initialState);
  });
});
