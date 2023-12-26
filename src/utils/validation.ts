import * as Yup from 'yup';

import { lang } from '@/contexts/Locale/constants';

const errorMessages: Record<string, Record<string, string>> = {
  EN: {
    email: 'Invalid email address',
    emailRequired: 'Email is a required field',
    password:
      'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character',
    passwordRequired: 'Password is a required field',
    passwordsMatch: 'Passwords must match',
    passwordsMatchRequired: 'Confirm password',
    passwordMinLength: 'Password must more that 8 symbols',
    passwordMaxLength: 'Password must not be more that 64 symbols',
    passwordTrailingSpaces: 'Password must not begin or end with a space',
    required: 'This field is required',
    invalidUrl: 'Invalid URL',
  },
  RU: {
    email: 'Неверный адрес электронной почты',
    emailRequired: 'Email обязательное поле',
    password:
      'Пароль должен содержать как минимум одну цифру, одну заглавную букву, одну строчную букву и один специальный символ',
    passwordRequired: 'Пароль обязательное поле',
    passwordsMatch: 'Пароли должны совпадать',
    passwordsMatchRequired: 'Введите подтверждение пароля',
    passwordMinLength: 'Пароль должен быть не менее 8 символов',
    passwordMaxLength: 'Пароль не должен быть больше 64 символов',
    passwordTrailingSpaces: 'Пароль не должен начинаться или заканчиваться пробелом',
    required: 'Это поле обязательно',
    invalidUrl: 'Неверный URL',
  },
};

const urlRegex = /^(https?:\/\/)?(localhost|[\w-]+(\.[\w-]+)+)(:\d+)?(\/[\w- .\/?%&=]*)?$/;

const urlValidationSchema = Yup.object().shape({
  url: Yup.string().matches(urlRegex, errorMessages[lang].invalidUrl),
});

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email(errorMessages[lang].email).required(errorMessages[lang].emailRequired),
});

const signInValidationSchema = emailValidationSchema.shape({
  password: Yup.string()
    .matches(/^[\s\S]{8,}$/u, {
      message: errorMessages[lang].passwordMinLength,
      excludeEmptyString: true,
    })
    .matches(/^[\s\S]{0,64}$/u, {
      message: errorMessages[lang].passwordMaxLength,
      excludeEmptyString: true,
    })
    .test(
      'no-leading-trailing-spaces',
      errorMessages[lang].passwordTrailingSpaces,
      (value) => value === undefined || value.trim() === value
    )
    .matches(
      /^(?=.*\d)(?=.*\p{Lu})(?=.*\p{Ll})(?=.*[@#$%^&+=! !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=\S+$)/u,
      {
        message: errorMessages[lang].password,
        excludeEmptyString: true,
      }
    )

    .required(errorMessages[lang].passwordRequired),
});

const signUpValidationSchema = signInValidationSchema.shape({
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], errorMessages[lang].passwordsMatch)
    .required(errorMessages[lang].passwordsMatchRequired),
});

export {
  urlValidationSchema,
  emailValidationSchema,
  signInValidationSchema,
  signUpValidationSchema,
};
