import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from '@mui/material/Button';

import { RoutePaths } from '@/routes/routes.enum';
import { auth, logout } from '@/services/firebase/firebase';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import styles from './AuthLinks.module.scss';

type Props = {
  type?: 'link' | 'button';
};
const AuthLinks: React.FC<Props> = ({ type = 'button' }) => {
  const [user, loading] = useAuthState(auth);
  const { strings } = useLocale().state;
  const navigate = useNavigate();
  const classLink = type === 'link' ? styles.link : styles.button;

  const exit = () => {
    logout();
    navigate(RoutePaths.WELCOME);
  };

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <>
        <NavLink className={styles.headLink} to={RoutePaths.MAIN}>
          {strings.mainLink}
        </NavLink>
        <Button onClick={exit} color="primary">
          {strings.signOut}
        </Button>
      </>
    );
  } else {
    return (
      <>
        <NavLink
          className={({ isActive }) => (isActive ? `${classLink} ${styles.active}` : classLink)}
          to={RoutePaths.SIGN_IN}
        >
          {strings.signIn}
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${classLink} ${styles.active}` : classLink)}
          to={RoutePaths.SIGN_UP}
        >
          {strings.signUp}
        </NavLink>
      </>
    );
  }
};

export default AuthLinks;
