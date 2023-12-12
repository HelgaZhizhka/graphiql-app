export const title = 'GraphiQL';

export const errorMessages: Record<string, Record<string, string>> = {
  EN: {
    email: 'Invalid email address',
    emailRequired: 'Email is a required field',
    password:
      'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character',
    passwordRequired: 'Password is a required field',
    passwordsMatch: 'Passwords must match',
    passwordsMatchRequired: 'Введите подтверждение пароля',
    required: 'This field is required',
  },
  RU: {
    email: 'Неверный адрес электронной почты',
    emailRequired: 'Email обязательное поле',
    password:
      'Пароль должен содержать как минимум одну цифру, одну заглавную букву, одну строчную букву и один специальный символ',
    passwordRequired: 'Пароль обязательное поле',
    passwordsMatch: 'Пароли должны совпадать',
    passwordsMatchRequired: 'Введите подтверждение пароля',
    required: 'Это поле обязательно',
  },
};
