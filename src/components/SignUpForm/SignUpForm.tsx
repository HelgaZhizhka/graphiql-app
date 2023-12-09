import React from 'react';
import { Form, Formik } from 'formik';

import { signUpValidationSchema } from '@/utils/validation';
import FormSubmitButton from '@/components/FormsUI/FormSubmitButton/FormSubmitButton';
import FormInputWrapper from '@/components/FormsUI/FormInputWrapper/FormInputWrapper';

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
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={signUpValidationSchema}
      onSubmit={(values) => {
        console.log('submit', values);
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
