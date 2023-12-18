import { useState } from 'react';
import { Form, Formik } from 'formik';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { signUpValidationSchema } from '@/utils/validation';
import { SignUpFormValues } from '@/utils/interfaces';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { registerEmail } from '@/services/firebase/firebase';
import FormSubmitButton from '@/components/FormsUI/FormSubmitButton/FormSubmitButton';
import FormInputWrapper from '@/components/FormsUI/FormInputWrapper/FormInputWrapper';
import { PasswordStrengthMeter } from '@/components/FormsUI/PasswordStrengthMeter';

const initialValues: SignUpFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm: React.FC = () => {
  const { state } = useLocale();
  const { strings } = state;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={signUpValidationSchema}
      onSubmit={(values) => {
        const name = values.email.split('@')[0];
        registerEmail(name, values.email, values.password);
      }}
    >
      {({ values, handleSubmit }) => (
        <Form onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
          <FormInputWrapper id="email" name="email" label={strings.email} />
          <FormInputWrapper
            id="password"
            name="password"
            label={strings.password}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {values.password && <PasswordStrengthMeter />}
          <FormInputWrapper
            id="confirmPassword"
            name="confirmPassword"
            label={strings.confirmPassword}
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormSubmitButton>{strings.signUp}</FormSubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
