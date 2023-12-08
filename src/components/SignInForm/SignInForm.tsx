import React from 'react';
import { Form, Formik } from 'formik';
import { Grid, Typography } from '@mui/material';
import { FormInputWrapper } from '../FormsUI/FormInputWrapper';
import { FormSubmitButton } from '../FormsUI/FormSubmitButton';
import { signInValidationSchema } from '../../utils/validation';

interface SignInFormValues {
  email: string;
  password: string;
}

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={signInValidationSchema}
      onSubmit={(values) => {
        console.log('submit', values);
      }}
    >
      <Form>
        <Grid container maxWidth={400}>
          <Grid item xs={12}>
            <Typography align="center">SignIn</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormInputWrapper id="email" name="email" label="Email address" />
          </Grid>
          <Grid item xs={12}>
            <FormInputWrapper id="password" name="password" label="Password" type="password" />
          </Grid>
          <Grid item xs={12} marginBottom={1}>
            <Typography>Forgot password?</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormSubmitButton>Sign In</FormSubmitButton>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default SignInForm;
