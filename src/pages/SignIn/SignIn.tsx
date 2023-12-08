import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import SignInForm from '@/components/SignInForm/SignInForm';

const SignIn = () => {
  return (
    <div className="container">
      <SignInForm />
      <Typography marginTop={1}>
        Need an account? <Link to={'/sign-up'}>SIGNUP</Link>
      </Typography>
    </div>
  );
};

export default SignIn;
