import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { RoutePaths } from '@/routes/routes.enum';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { useStickyHeader } from '@/hooks';
import { auth, logout } from '@/services/firebase/firebase';
import { TITLE } from '@/utils/constants';
import { Logo } from '@/components/Logo';
import { SelectLanguage } from '@/components/SelectLanguage';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const { state } = useLocale();
  const { isSticky, sentinelRef } = useStickyHeader(0.1);
  const { strings } = state;

  const exit = () => {
    logout();
    navigate(RoutePaths.WELCOME);
  };

  return (
    <>
      <div className={styles.sentinel} ref={sentinelRef}></div>
      {loading ? (
        <span></span>
      ) : (
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
              <NavLink to={RoutePaths.WELCOME} className={styles.logo}>
                <h1 className={styles.logoTitle}>{strings.welcomeLink}</h1>
                <Logo title={TITLE} />
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
                  {strings.mainLink}
                </NavLink>
                <Button onClick={exit} color="primary">
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
      )}
    </>
  );
};

export default Header;
