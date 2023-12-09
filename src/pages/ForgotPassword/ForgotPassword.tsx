import Container from '@mui/material/Container';

import { CenteredTypography } from '@/components/CenteredTypography';
import { ForgotPasswordForm } from '@/components/ForgotPasswordForm';

const ForgotPassword = () => (
  <Container maxWidth="sm">
    <CenteredTypography mt={4} mb={2} variant="h4">
      Forgot Password
    </CenteredTypography>
    <CenteredTypography mt={2} mb={2}>
      Enter your email address and we will send you a link to reset your password.
    </CenteredTypography>
    <ForgotPasswordForm />
  </Container>
);

export default ForgotPassword;
