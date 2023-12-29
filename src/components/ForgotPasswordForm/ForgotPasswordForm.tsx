import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik, FormikProps } from 'formik';

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

  const formikRef = useRef<FormikProps<ForgotPasswordValues>>(null);

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.validateForm();
    }
  }, [strings]);

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={emailValidationSchema(strings)}
      onSubmit={(values) => {
        resetPassword(values.email);
        navigate(RoutePaths.WELCOME);
      }}
      innerRef={formikRef}
    >
      <Form>
        <FormInputWrapper id="email" name="email" label={strings.email} />
        <FormSubmitButton>{strings.send}</FormSubmitButton>
      </Form>
    </Formik>
  );
};

export default ForgotPassword;
