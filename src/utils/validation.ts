import { lang } from '@/contexts/Locale/constants';
import * as Yup from 'yup';

const errorMessages: Record<string, Record<string, string>> = {
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

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email(errorMessages[lang].email).required(errorMessages[lang].emailRequired),
});

const signInValidationSchema = emailValidationSchema.shape({
  // email: Yup.string().email(errorMessages[lang].email).required(errorMessages[lang].emailRequired),
  password: Yup.string()
    .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/, {
      message: errorMessages[lang].password,
      excludeEmptyString: true,
    })
    .required(errorMessages[lang].passwordRequired),
});

const signUpValidationSchema = signInValidationSchema.shape({
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], errorMessages[lang].passwordsMatch)
    .required(errorMessages[lang].passwordsMatchRequired),
});

export { emailValidationSchema, signInValidationSchema, signUpValidationSchema };
