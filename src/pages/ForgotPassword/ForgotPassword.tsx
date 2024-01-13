import Container from '@mui/material/Container';

import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { CenteredTypography } from '@/components/CenteredTypography';
import { ForgotPasswordForm } from '@/components/ForgotPasswordForm';

const ForgotPassword: React.FC = () => {
  const { state } = useLocale();
  const { strings } = state;

  return (
    <Container maxWidth="sm" sx={{ p: '40px 20px 100px' }}>
      <CenteredTypography mt={2} mb={2} variant="h4">
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
