import React from 'react';
import { Form, Formik } from 'formik';

import { signInValidationSchema } from '@/utils/validation';
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

const SignInForm: React.FC = () => (
  <Formik
    initialValues={{ ...initialValues }}
    validationSchema={signInValidationSchema}
    onSubmit={(values) => {
      console.log('submit', values);
    }}
  >
    <Form>
      <FormInputWrapper id="email" name="email" label="Email address" />
      <FormInputWrapper id="password" name="password" label="Password" type="password" />
      <FormSubmitButton>Sign In</FormSubmitButton>
    </Form>
  </Formik>
);

export default SignInForm;
