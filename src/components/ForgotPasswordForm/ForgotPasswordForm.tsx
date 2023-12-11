import React from 'react';
import { Form, Formik } from 'formik';

import { emailValidationSchema } from '@/utils/validation';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { FormInputWrapper } from '@/components/FormsUI/FormInputWrapper';
import { FormSubmitButton } from '@/components/FormsUI/FormSubmitButton';
import { resetPassword } from '@/services/firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/routes/routes.enum';

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
      //TODO: Доделать валидацию
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
