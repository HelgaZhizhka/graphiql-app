import { NavLink } from 'react-router-dom';

import { RoutePaths } from '@/routes/routes.enum';
import logo from '@/assets/images/logo.svg';
import styles from './Header.module.scss';

const Header: React.FC = () => (
  <header className={styles.root}>
    <div className={`${styles.container} container`}>
      <NavLink
        to={RoutePaths.WELCOME}
        className={({ isActive }) => (isActive ? `${styles.logo} ${styles.active}` : '')}
      >
        <img className={styles.logoImage} src={logo} alt="GraphQL" width="30" />
        <h1 className={styles.logoTitle}>GraphQL</h1>
      </NavLink>
    </div>
  </header>
);

export default Header;
