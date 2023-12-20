import { createSlice } from '@reduxjs/toolkit';

import { lang } from '@/contexts/Locale/constants';

const messages: Messages = {
  EN: {
    success: {
      login: 'Login successful. Welcome back!',
      registration: 'Registration successful. You are logged in!',
      reset: 'Password reset email sent. Please check your email.',
    },
    error: {
      invalidCredential: 'Invalid credential. Please try again.',
      invalidEmail: 'Invalid email address.',
      emailAlreadyInUse: 'Email already in use. Please try another email.',
      userDisabled: 'User account has been disabled. Please contact support.',
      userNotFound: 'No user found with this email. Please register',
      userExists: 'User already exists. Please login',
      wrongPassword: 'Wrong password. Please try again.',
      weakPassword: 'Password should be at least 6 characters.',
      operationNotAllowed: 'Operation not allowed. Please try again later.',
      tooManyRequests: 'Too many requests. Please try again later.',
      network: 'An error occurred. Please try again later.',
      unknown: 'Unknown error occurred. Please try again later.',
      fetchSchema: 'API endpoint not found',
      fetchCORS: 'The API request failed. Make sure that CORS is support by your API.',
      fetchQuery: 'Error sending query',
      parsingError: 'Error parsing variable / header field',
      emptyQuery: 'Query is incorrect',
    },
  },
  RU: {
    success: {
      login: 'Вход выполнен успешно. Добро пожаловать!',
      registration: 'Регистрация прошла успешно. Вы вошли в систему!',
      reset: 'Письмо для сброса пароля отправлено. Пожалуйста, проверьте свою почту.',
    },
    error: {
      invalidCredential: 'Неверные учетные данные.',
      invalidEmail: 'Неверный адрес электронной почты.',
      emailAlreadyInUse:
        'Электронная почта уже используется. Пожалуйста, введите другой адрес электронной почты.',
      userDisabled: 'Учетная запись пользователя отключена. Пожалуйста, свяжитесь с поддержкой.',
      userNotFound: 'Пользователь с таким email не найден. Пожалуйста, зарегистрируйтесь',
      userExists: 'Пользователь уже существует. Пожалуйста, войдите',
      wrongPassword: 'Неверный пароль. Пожалуйста, попробуйте еще раз.',
      weakPassword: 'Пароль должен быть не менее 6 символов.',
      operationNotAllowed: 'Операция не разрешена. Пожалуйста, попробуйте позже.',
      tooManyRequests: 'Слишком много запросов. Пожалуйста, попробуйте позже.',
      network: 'Произошла ошибка. Пожалуйста, попробуйте позже.',
      unknown: 'Произошла неизвестная ошибка. Пожалуйста, попробуйте позже.',
      fetchSchema: 'API endpoint не найден',
      fetchCORS: 'Не удалось выполнить запрос API. Убедитесь, что CORS поддерживается вашим API.',
      fetchQuery: 'Ошибка отправки запроса',
      parsingError: 'Ошибка парсинга поля переменных / заголовка',
      emptyQuery: 'Запрос некорректен',
    },
  },
};

type Language = 'EN' | 'RU';

type MessageTypes = {
  success: {
    login: string;
    registration: string;
    reset: string;
  };
  error: {
    invalidCredential: string;
    invalidEmail: string;
    emailAlreadyInUse: string;
    userDisabled: string;
    userNotFound: string;
    wrongPassword: string;
    weakPassword: string;
    userExists: string;
    operationNotAllowed: string;
    tooManyRequests: string;
    network: string;
    unknown: string;
    fetchSchema: string;
    fetchQuery: string;
    fetchCORS: string;
    parsingError: string;
    emptyQuery: string;
  };
};

type Messages = {
  [key in Language]: MessageTypes;
};

interface MessageState {
  message: string;
  messageType: 'error' | 'success' | 'info' | 'warning';
}

const initialState: MessageState = {
  message: '',
  messageType: 'info',
};
const language = lang as Language;

const getErrorMessage = (code: string) => {
  switch (code) {
    case 'auth/invalid-credential':
      return messages[language].error.invalidCredential;
    case 'auth/invalid-email':
      return messages[language].error.invalidEmail;
    case 'auth/user-disabled':
      return messages[language].error.userDisabled;
    case 'auth/user-not-found':
      return messages[language].error.userNotFound;
    case 'auth/wrong-password':
      return messages[language].error.wrongPassword;
    case 'auth/weak-password':
      return messages[language].error.weakPassword;
    case 'auth/email-already-in-use':
      return messages[language].error.emailAlreadyInUse;
    case 'auth/network-request-failed':
      return messages[language].error.network;
    case 'auth/too-many-requests':
      return messages[language].error.tooManyRequests;
    case 'fetchSchema':
      return messages[language].error.fetchSchema;
    case 'fetchQuery':
      return messages[language].error.fetchQuery;
    case 'fetchCORS':
      return messages[language].error.fetchCORS;
    case 'parsingError':
      return messages[language].error.parsingError;
    case 'emptyQuery':
      return messages[language].error.emptyQuery;
    default:
      return messages[language].error.unknown;
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
