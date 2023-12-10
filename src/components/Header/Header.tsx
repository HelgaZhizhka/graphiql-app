import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { RoutePaths } from '@/routes/routes.enum';
import { Logo } from '@/components/Logo';
import { SelectLanguage } from '@/components/SelectLanguage';
import styles from './Header.module.scss';
import { useLocale } from '@/contexts/Locale/LocaleProvider';

const Header: React.FC = () => {
  const [auth] = useState(false);
  const { state } = useLocale();
  const { strings } = state;

  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar sx={{ width: { lg: '1280px', xs: '100%' }, margin: 'auto' }}>
        <Box sx={{ flexGrow: 1 }}>
          <NavLink to={RoutePaths.WELCOME}>
            <Logo title="GraphiQL" />
          </NavLink>
        </Box>
        <SelectLanguage />
        {auth ? (
          <>
            <NavLink
              to={RoutePaths.MAIN}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Main
            </NavLink>
            <Button color="inherit">{strings.signOut}</Button>
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
  );
};

export default Header;
