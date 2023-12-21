import { NavLink } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { RoutePaths } from '@/routes/routes.enum';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { useStickyHeader } from '@/hooks';
// import { auth, logout } from '@/services/firebase/firebase';
import { TITLE } from '@/utils/constants';
import { Logo } from '@/components/Logo';
import { AuthLinks } from '@/components/AuthLinks';
import { SelectLanguage } from '@/components/SelectLanguage';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { state } = useLocale();
  const { isSticky, sentinelRef } = useStickyHeader(0.1);
  const { strings } = state;

  const classHeader = isSticky ? `${styles.root} sticky` : styles.root;

  const sentinel = <div className={styles.sentinel} ref={sentinelRef}></div>;

  return (
    <>
      {sentinel}
      <AppBar
        data-testid="header"
        className={classHeader}
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
          <AuthLinks />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
