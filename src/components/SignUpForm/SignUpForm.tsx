import React from 'react';
import { Form, Formik } from 'formik';
import { Grid, Typography } from '@mui/material';
import FormSubmitButton from '../FormsUI/FormSubmitButton/FormSubmitButton';
import FormInputWrapper from '../FormsUI/FormInputWrapper/FormInputWrapper';
import { sugnUpValidationSchema } from '../../utils/validation';

interface SignUpFormValues {
  email: string;
  password: string;
  confirmpassword: string;
}

const initialValues: SignUpFormValues = {
  email: '',
  password: '',
  confirmpassword: '',
};

const SignUpForm: React.FC = () => {
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={sugnUpValidationSchema}
      onSubmit={(values) => {
        console.log('submit', values);
      }}
    >
      <Form>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }}>
          <Grid item xs={12}>
            <Typography>SignUp</Typography>
          </Grid>

          <Grid item xs={12}>
            <FormInputWrapper id="email" name="email" label="Email address" />
          </Grid>
          <Grid item xs={12}>
            <FormInputWrapper id="password" name="password" label="Password" type="password" />
          </Grid>
          <Grid item xs={12}>
            <FormInputWrapper
              id="confirmpassword"
              name="confirmpassword"
              label="Comfirm Password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormSubmitButton>Sign Up</FormSubmitButton>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
