import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '@/services/firebase/firebase';
import { RoutePaths } from '@/routes/routes.enum';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { CenteredTypography } from '@/components/CenteredTypography';
import { SignInForm } from '@/components/SignInForm';
import { useEffect } from 'react';

const SignIn = () => {
  const { state } = useLocale();
  const { strings } = state;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      //TODO maybe trigger a loading screen
      return;
    }
    if (user) navigate('/');
  }, [user, loading]);

  return (
    <Container maxWidth="sm" sx={{ p: '40px 0 100px' }}>
      <CenteredTypography mt={2} mb={2} variant="h4">
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
