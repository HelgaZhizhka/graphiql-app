import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useAuthState } from 'react-firebase-hooks/auth';

import { signUpValidationSchema } from '@/utils/validation';
import FormSubmitButton from '@/components/FormsUI/FormSubmitButton/FormSubmitButton';
import FormInputWrapper from '@/components/FormsUI/FormInputWrapper/FormInputWrapper';
import { auth, registerEmail } from '@/services/firebase/firebase';
import { useNavigate } from 'react-router-dom';

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignUpFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/main');
  }, [user, loading]);

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={signUpValidationSchema}
      onSubmit={(values) => {
        const name = values.email.split('@')[0];
        registerEmail(name, values.email, values.password);
      }}
    >
      <Form>
        <FormInputWrapper id="email" name="email" label="Email address" />
        <FormInputWrapper id="password" name="password" label="Password" type="password" />
        <FormInputWrapper
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
        />
        <FormSubmitButton>Sign Up</FormSubmitButton>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
