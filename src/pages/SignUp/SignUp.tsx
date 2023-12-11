import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

import { RoutePaths } from '@/routes/routes.enum';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { CenteredTypography } from '@/components/CenteredTypography';
import { SignUpForm } from '@/components/SignUpForm';

const SignUp = () => {
  const { state } = useLocale();
  const { strings } = state;
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
    </Container>
  );
};

export default SignUp;
