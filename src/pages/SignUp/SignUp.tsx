import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/services/firebase/firebase';
import { RoutePaths } from '@/routes/routes.enum';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { CenteredTypography } from '@/components/CenteredTypography';
import { SignUpForm } from '@/components/SignUpForm';
import { Alert } from '@mui/material';

const SignUp = () => {
  const { state } = useLocale();
  const { strings } = state;
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (user) navigate(RoutePaths.MAIN);
  }, [user, loading, error]);

  return (
    <Container maxWidth="sm" sx={{ p: '40px 0 100px' }}>
      <CenteredTypography mt={2} mb={2} variant="h4">
        {strings.signUp}
      </CenteredTypography>
      <SignUpForm />
      <CenteredTypography mt={2}>
        {strings.haveAnAccount}{' '}
        <Link to={RoutePaths.SIGN_IN} className="link">
          {strings.signIn}
        </Link>
      </CenteredTypography>
      {error && <Alert>Problem</Alert>}
    </Container>
  );
};

export default SignUp;
