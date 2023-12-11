import { Form, Formik } from 'formik';

import { signInValidationSchema } from '@/utils/validation';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { FormInputWrapper } from '@/components/FormsUI/FormInputWrapper';
import { FormSubmitButton } from '@/components/FormsUI/FormSubmitButton';
import { logInWithEmail } from '@/services/firebase/firebase';

interface SignInFormValues {
  email: string;
  password: string;
}

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const { state } = useLocale();
  const { strings } = state;

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={signInValidationSchema}
      onSubmit={(values) => {
        logInWithEmail(values.email, values.password);
      }}
    >
      <Form>
        <FormInputWrapper id="email" name="email" label={strings.email} />
        <FormInputWrapper id="password" name="password" label={strings.password} type="password" />
        <FormSubmitButton>{strings.signIn}</FormSubmitButton>
      </Form>
    </Formik>
  );
};

export default SignInForm;
