import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/services/firebase/firebase';

type Props = {
  redirectTo: string;
} & React.PropsWithChildren;

const ProtectedRoute: React.FC<Props> = ({ children, redirectTo }) => {
  const [user] = useAuthState(auth);
  return user ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
