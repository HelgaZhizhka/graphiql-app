import React from 'react';
import { Form, Formik } from 'formik';

import { signUpValidationSchema } from '@/utils/validation';
import FormSubmitButton from '@/components/FormsUI/FormSubmitButton/FormSubmitButton';
import FormInputWrapper from '@/components/FormsUI/FormInputWrapper/FormInputWrapper';
import { useLocale } from '@/contexts/Locale/LocaleProvider';

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
  const { state } = useLocale();
  const { strings } = state;

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={signUpValidationSchema}
      onSubmit={(values) => {
        console.log('submit', values);
      }}
    >
      <Form>
        <FormInputWrapper id="email" name="email" label={strings.email} />
        <FormInputWrapper id="password" name="password" label={strings.password} type="password" />
        <FormInputWrapper
          id="confirmPassword"
          name="confirmPassword"
          label={strings.confirmPassword}
          type="password"
        />
        <FormSubmitButton>{strings.signUp}</FormSubmitButton>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
