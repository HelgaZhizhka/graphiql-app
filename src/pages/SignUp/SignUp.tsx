import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import { useLocale } from '@/contexts/Locale/LocaleProvider';

const SignUp = () => {
  const { state } = useLocale();
  const { strings } = state;

  return (
    <div className="container">
      <SignUpForm />
      <Typography marginTop={1}>
        Already have an account? <Link to={'/sign-in'}>{strings.singInLinkButton}</Link>
      </Typography>
    </div>
  );
};

export default SignUp;
