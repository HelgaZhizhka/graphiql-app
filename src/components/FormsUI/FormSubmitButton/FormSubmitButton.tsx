import { Button, ButtonProps } from '@mui/material';
import { useFormikContext } from 'formik';

const FormSubmitButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton: ButtonProps = {
    ...props,
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
    onClick: handleSubmit,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default FormSubmitButton;
