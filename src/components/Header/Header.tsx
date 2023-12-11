import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { RoutePaths } from '@/routes/routes.enum';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { useStickyHeader } from '@/hooks/useStickyHeader';
import { Logo } from '@/components/Logo';
import { SelectLanguage } from '@/components/SelectLanguage';
import styles from './Header.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '@/services/firebase/firebase';

const Header: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const exit = () => {
    console.log(user);
    logout();
    navigate('/');
  };
  const { state } = useLocale();
  const { isSticky, sentinelRef } = useStickyHeader(0.1);
  const { strings } = state;

  return (
    <>
      <div className={styles.sentinel} ref={sentinelRef}></div>
      <AppBar
        className={styles.root}
        position={isSticky ? 'sticky' : 'static'}
        style={{
          backgroundColor: isSticky ? 'var(--header-animate-bg)' : 'var(--header-bg)',
          boxShadow: isSticky ? 'none' : '',
        }}
      >
        <Toolbar
          sx={{
            width: { lg: '1280px', xs: '100%' },
            margin: 'auto',
            minHeight: { sm: isSticky ? '50px' : '64px' },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <NavLink to={RoutePaths.WELCOME}>
              <Logo title="GraphiQL" />
            </NavLink>
          </Box>
          <SelectLanguage />
          {user ? (
            <>
              <NavLink
                to={RoutePaths.MAIN}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Main
              </NavLink>
              <Button onClick={() => exit()} color="inherit">
                {strings.signOut}
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to={RoutePaths.SIGN_IN}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {strings.signIn}
              </NavLink>
              <NavLink
                to={RoutePaths.SIGN_UP}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {strings.signUp}
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
