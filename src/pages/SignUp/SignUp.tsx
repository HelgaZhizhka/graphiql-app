import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

import { RoutePaths } from '@/routes/routes.enum';
import { CenteredTypography } from '@/components/CenteredTypography';
import { SignUpForm } from '@/components/SignUpForm';
import { useLocale } from '@/contexts/Locale/LocaleProvider';

const SignUp = () => {
  const { state } = useLocale();
  const { strings } = state;
  return (
    <Container maxWidth="sm">
      <CenteredTypography mt={4} mb={2} variant="h4">
        Sign Up
      </CenteredTypography>
      <SignUpForm />
      <CenteredTypography mt={2}>
        Already have an account?{' '}
        <Link to={RoutePaths.SIGN_IN} className="link">
          {strings.singInLinkButton}
        </Link>
      </CenteredTypography>
    </Container>
  );
};

export default SignUp;
