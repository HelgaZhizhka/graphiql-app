import * as Yup from 'yup';

import { vocab } from '@/contexts/Locale/constants';

const urlRegex = /^(https?:\/\/)?(localhost|[\w-]+(\.[\w-]+)+)(:\d+)?(\/[\w- .\/?%&=]*)?$/;

const urlValidationSchema = (strings: vocab) =>
  Yup.object().shape({
    url: Yup.string().matches(urlRegex, strings.invalidUrlValidation),
  });

const emailValidationSchema = (strings: vocab) =>
  Yup.object().shape({
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: strings.emailValidation,
        excludeEmptyString: true,
      })
      .required(strings.emailRequiredValidation),
  });

const signInValidationSchema = (strings: vocab) =>
  Yup.object().shape({
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: strings.emailValidation,
        excludeEmptyString: true,
      })
      .required(strings.emailRequiredValidation),
    password: Yup.string().required(strings.passwordRequiredValidation),
  });

const signUpValidationSchema = (strings: vocab) =>
  Yup.object().shape({
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: strings.emailValidation,
        excludeEmptyString: true,
      })
      .required(strings.emailRequiredValidation),
    password: Yup.string()
      .matches(/^[\s\S]{8,}$/u, {
        message: strings.passwordMinLengthValidation,
        excludeEmptyString: true,
      })
      .matches(/^[\s\S]{0,64}$/u, {
        message: strings.passwordMaxLengthValidation,
        excludeEmptyString: true,
      })
      .test(
        'no-leading-trailing-spaces',
        strings.passwordTrailingSpacesValidation,
        (value) => value === undefined || value.trim() === value
      )
      .matches(
        /^(?=.*\d)(?=.*\p{Lu})(?=.*\p{Ll})(?=.*[@#$%^&+=! !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=\S+$)/u,
        {
          message: strings.passwordValidation,
          excludeEmptyString: true,
        }
      )
      .required(strings.passwordRequiredValidation),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], strings.passwordsMatchValidation)
      .required(strings.passwordsMatchRequiredValidation),
  });

export {
  urlValidationSchema,
  emailValidationSchema,
  signInValidationSchema,
  signUpValidationSchema,
};
