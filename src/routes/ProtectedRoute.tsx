import { auth } from '@/services/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

type Props = {
  redirectTo: string;
} & React.PropsWithChildren;

const ProtectedRoute: React.FC<Props> = ({ children, redirectTo }) => {
  const [user] = useAuthState(auth);
  return user ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
