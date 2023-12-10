import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

import { RoutePaths } from '@/routes/routes.enum';
import { CenteredTypography } from '@/components/CenteredTypography';
import { SignInForm } from '@/components/SignInForm';
import { useLocale } from '@/contexts/Locale/LocaleProvider';

const SignIn = () => {
  const { state } = useLocale();
  const { strings } = state;

  return (
    <Container maxWidth="sm">
      <CenteredTypography mt={4} mb={2} variant="h4">
        {strings.signIn}
      </CenteredTypography>
      <SignInForm />
      <CenteredTypography mt={2}>
        <Link to={RoutePaths.FORGOT_PASSWORD} className="text">
          {strings.forgotPassword}
        </Link>
      </CenteredTypography>
      <CenteredTypography mt={2}>
        {strings.noAccount}{' '}
        <Link to={RoutePaths.SIGN_UP} className="link">
          {strings.signUp}
        </Link>
      </CenteredTypography>
    </Container>
  );
};

export default SignIn;
