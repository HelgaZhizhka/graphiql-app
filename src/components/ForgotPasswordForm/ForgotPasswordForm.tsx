import React from 'react';
import { Form, Formik } from 'formik';

import { signInValidationSchema } from '@/utils/validation';
import { FormInputWrapper } from '@/components/FormsUI/FormInputWrapper';
import { FormSubmitButton } from '@/components/FormsUI/FormSubmitButton';

interface ForgotPasswordValues {
  email: string;
}

const initialValues: ForgotPasswordValues = {
  email: '',
};

const ForgotPassword: React.FC = () => (
  <Formik
    initialValues={{ ...initialValues }}
    validationSchema={signInValidationSchema}
    onSubmit={(values) => {
      console.log('submit', values);
    }}
  >
    <Form>
      <FormInputWrapper id="email" name="email" label="Email address" />
      <FormSubmitButton>Send</FormSubmitButton>
    </Form>
  </Formik>
);

export default ForgotPassword;
