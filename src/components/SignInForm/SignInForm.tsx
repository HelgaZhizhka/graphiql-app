import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';

import { signInValidationSchema } from '@/utils/validation';
import { FormInputWrapper } from '@/components/FormsUI/FormInputWrapper';
import { FormSubmitButton } from '@/components/FormsUI/FormSubmitButton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logInWithEmail } from '@/services/firebase/firebase';

interface SignInFormValues {
  email: string;
  password: string;
}

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      //TODO maybe trigger a loading screen
      return;
    }
    if (user) navigate('/');
  }, [user, loading]);

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={signInValidationSchema}
      onSubmit={(values) => {
        logInWithEmail(values.email, values.password);
      }}
    >
      <Form>
        <FormInputWrapper id="email" name="email" label="Email address" />
        <FormInputWrapper id="password" name="password" label="Password" type="password" />
        <FormSubmitButton>Sign In</FormSubmitButton>
      </Form>
    </Formik>
  );
};

export default SignInForm;
