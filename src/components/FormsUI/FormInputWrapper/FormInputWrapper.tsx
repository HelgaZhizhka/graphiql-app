import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';

const FormInputWrapper: React.FC<TextFieldProps> = ({ ...props }) => {
  const [field, meta] = useField(props.name!);

  const configTextField: TextFieldProps = {
    ...field,
    ...props,
    fullWidth: true,
    margin: 'dense',
    helperText: meta.touched && meta.error ? meta.error : ' ',
    variant: 'outlined',
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
  }

  return <TextField {...configTextField} />;
};

export default FormInputWrapper;
