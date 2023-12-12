import { createSlice } from '@reduxjs/toolkit';

import { lang } from '@/contexts/Locale/constants';
import { messages } from './constants';
import { Language } from './types';

interface MessageState {
  message: string;
  messageType: 'error' | 'success' | 'info' | 'warning';
}

const initialState: MessageState = {
  message: '',
  messageType: 'info',
};

const getErrorMessage = (code: string) => {
  switch (code) {
    case 'auth/invalid-credential':
      return messages[lang as Language].error.invalidCredential;
    case 'auth/invalid-email':
      return messages[lang as Language].error.invalidEmail;
    case 'auth/user-disabled':
      return messages[lang as Language].error.userDisabled;
    case 'auth/user-not-found':
      return messages[lang as Language].error.userNotFound;
    case 'auth/wrong-password':
      return messages[lang as Language].error.wrongPassword;
    case 'auth/weak-password':
      return messages[lang as Language].error.weakPassword;
    case 'auth/email-already-in-use':
      return messages[lang as Language].error.emailAlreadyInUse;
    case 'auth/network-request-failed':
      return messages[lang as Language].error.network;
    case 'auth/too-many-requests':
      return messages[lang as Language].error.tooManyRequests;
    default:
      return messages[lang as Language].error.unknown;
  }
};

const getSuccessMessage = (code: string) => {
  switch (code) {
    case 'login':
      return messages[lang as Language].success.login;
    case 'registration':
      return messages[lang as Language].success.registration;
    case 'reset':
      return messages[lang as Language].success.reset;
    default:
      return 'Success';
  }
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.text;
      state.messageType = action.payload.type || 'info';
    },
    setSuccess: (state, action) => {
      state.message = getSuccessMessage(action.payload);
      state.messageType = 'success';
    },
    setError: (state, action) => {
      state.message = getErrorMessage(action.payload);
      state.messageType = 'error';
    },
    clearMessage: (state) => {
      state.message = '';
      state.messageType = 'info';
    },
  },
});

export const { setMessage, setError, setSuccess, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
