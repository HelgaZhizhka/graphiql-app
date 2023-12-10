import Container from '@mui/material/Container';

import { CenteredTypography } from '@/components/CenteredTypography';
import { ForgotPasswordForm } from '@/components/ForgotPasswordForm';
import { useLocale } from '@/contexts/Locale/LocaleProvider';

const ForgotPassword = () => {
  const { state } = useLocale();
  const { strings } = state;

  return (
    <Container maxWidth="sm">
      <CenteredTypography mt={4} mb={2} variant="h4">
        {strings.resetPassword}
      </CenteredTypography>
      <CenteredTypography mt={2} mb={2}>
        {strings.resetPasswordMessage}
      </CenteredTypography>
      <ForgotPasswordForm />
    </Container>
  );
};

export default ForgotPassword;
