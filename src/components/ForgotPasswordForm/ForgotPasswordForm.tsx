import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { emailValidationSchema } from '@/utils/validation';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { RoutePaths } from '@/routes/routes.enum';
import { resetPassword } from '@/services/firebase/firebase';
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
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={emailValidationSchema}
      onSubmit={(values) => {
        resetPassword(values.email);
        navigate(RoutePaths.WELCOME);
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
