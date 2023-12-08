import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import SignUpForm from '@/components/SignUpForm/SignUpForm';

const SignUp = () => {
  return (
    <div className="container">
      <SignUpForm />
      <Typography marginTop={1}>
        Already have an account? <Link to={'/sign-in'}>SIGNIN</Link>
      </Typography>
    </div>
  );
};

export default SignUp;
