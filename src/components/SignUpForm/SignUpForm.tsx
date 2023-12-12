import { Form, Formik } from 'formik';

import { signUpValidationSchema } from '@/utils/validation';
import { SignUpFormValues } from '@/utils/interfaces';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { registerEmail } from '@/services/firebase/firebase';
import FormSubmitButton from '@/components/FormsUI/FormSubmitButton/FormSubmitButton';
import FormInputWrapper from '@/components/FormsUI/FormInputWrapper/FormInputWrapper';
import { PasswordStrengthMeter } from '@/components/FormsUI/PasswordStrengthMeter';

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
        const name = values.email.split('@')[0];
        registerEmail(name, values.email, values.password);
      }}
    >
      {({ values }) => (
        <Form>
          <FormInputWrapper id="email" name="email" label={strings.email} />
          <FormInputWrapper
            id="password"
            name="password"
            label={strings.password}
            type="password"
          />
          {values.password && <PasswordStrengthMeter />}
          <FormInputWrapper
            id="confirmPassword"
            name="confirmPassword"
            label={strings.confirmPassword}
            type="password"
          />
          <FormSubmitButton>{strings.signUp}</FormSubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
