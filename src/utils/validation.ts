import * as Yup from 'yup';

import { lang } from '@/contexts/Locale/constants';
import { errorMessages } from './constants';

const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email(errorMessages[lang].email).required(errorMessages[lang].emailRequired),
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

export { signInValidationSchema, signUpValidationSchema };
