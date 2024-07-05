import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/services/firebase/firebase';
import { Loader } from '@/components/Loader';

type Props = {
  redirectTo: string;
} & React.PropsWithChildren;

const ProtectedRoute: React.FC<Props> = ({ children, redirectTo }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  return user ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
