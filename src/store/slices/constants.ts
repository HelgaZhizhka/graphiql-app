import { Messages } from './types';

export const messages: Messages = {
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
    },
  },
};
