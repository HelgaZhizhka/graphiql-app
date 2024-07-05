import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/services/firebase/firebase';
import { Loader } from '@/components/Loader';
import { RoutePaths } from '@/routes/routes.enum';

const AuthHandler: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(RoutePaths.MAIN);
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <Loader />;
  }

  return children;
};

export default AuthHandler;
