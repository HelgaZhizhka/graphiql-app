import { Link } from 'react-router-dom';

import styles from './Main.module.scss';

const Main = () => {
  return (
    <div>
      {' '}
      <div className={styles.buttonWrapper}>
        <button>
          <Link to={'/'}>BACK</Link>
        </button>
      </div>
    </div>
  );
};

export default Main;
