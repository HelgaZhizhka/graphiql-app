import React from 'react';
import { Form, Formik } from 'formik';

import { signInValidationSchema } from '@/utils/validation';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { FormInputWrapper } from '@/components/FormsUI/FormInputWrapper';
import { FormSubmitButton } from '@/components/FormsUI/FormSubmitButton';

interface ForgotPasswordValues {
  email: string;
}

const initialValues: ForgotPasswordValues = {
  email: '',
};

const ForgotPassword: React.FC = () => {
  const { state } = useLocale();
  const { strings } = state;

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={signInValidationSchema}
      onSubmit={(values) => {
        console.log('submit', values);
      }}
    >
      <Form>
        <FormInputWrapper id="email" name="email" label={strings.email} />
        <FormSubmitButton>{strings.send}</FormSubmitButton>
      </Form>
    </Formik>
  );
};

export default ForgotPassword;
