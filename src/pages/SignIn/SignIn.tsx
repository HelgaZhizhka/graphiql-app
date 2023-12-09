import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

import { RoutePaths } from '@/routes/routes.enum';
import { CenteredTypography } from '@/components/CenteredTypography';
import { SignInForm } from '@/components/SignInForm';

const SignIn = () => (
  <Container maxWidth="sm">
    <CenteredTypography mt={4} mb={2} variant="h4">
      Sign In
    </CenteredTypography>
    <SignInForm />
    <CenteredTypography mt={2}>
      <Link to={RoutePaths.FORGOT_PASSWORD} className="text">
        Forgot password?
      </Link>
    </CenteredTypography>
    <CenteredTypography mt={2}>
      Need an account?{' '}
      <Link to={RoutePaths.SIGN_UP} className="link">
        Sign Up
      </Link>
    </CenteredTypography>
  </Container>
);

export default SignIn;
