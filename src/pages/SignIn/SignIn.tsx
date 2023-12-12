import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

import { RoutePaths } from '@/routes/routes.enum';
import { useLocale } from '@/contexts/Locale/LocaleProvider';

import { CenteredTypography } from '@/components/CenteredTypography';
import { SignInForm } from '@/components/SignInForm';

const SignIn: React.FC = () => {
  const { state } = useLocale();
  const { strings } = state;
  return (
    <Container maxWidth="sm" sx={{ p: '40px 0 100px' }}>
      <CenteredTypography mt={2} mb={2} variant="h4">
        {strings.signIn}
      </CenteredTypography>
      <SignInForm />
      <CenteredTypography mt={2}>
        <Link to={RoutePaths.FORGOT_PASSWORD}>{strings.forgotPassword}</Link>
      </CenteredTypography>
      <CenteredTypography mt={2}>
        {strings.noAccount} <Link to={RoutePaths.SIGN_UP}>{strings.signUp}</Link>
      </CenteredTypography>
    </Container>
  );
};

export default SignIn;
