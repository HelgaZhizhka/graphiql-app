import * as Yup from 'yup';

const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is a required field'),
  password: Yup.string()
    .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/, {
      message:
        'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character',
      excludeEmptyString: true,
    })
    .required('Password is a required field'),
});

const sugnUpValidationSchema = signInValidationSchema.shape({
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

export { signInValidationSchema, sugnUpValidationSchema };
