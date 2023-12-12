import CircularProgress from '@mui/material/CircularProgress';

import styles from './Loader.module.scss';

const Loader: React.FC = () => (
  <div className={styles.root}>
    <CircularProgress />
  </div>
);

export default Loader;
