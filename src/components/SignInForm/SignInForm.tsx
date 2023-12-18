import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { signInValidationSchema } from '@/utils/validation';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { logInWithEmail } from '@/services/firebase/firebase';
import { FormInputWrapper } from '@/components/FormsUI/FormInputWrapper';
import { FormSubmitButton } from '@/components/FormsUI/FormSubmitButton';

interface SignInFormValues {
  email: string;
  password: string;
}

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const { state } = useLocale();
  const { strings } = state;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={signInValidationSchema}
      onSubmit={async (values) => {
        await logInWithEmail(values.email, values.password);
      }}
    >
      {({ handleSubmit }) => (
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
          <FormSubmitButton>{strings.signIn}</FormSubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
