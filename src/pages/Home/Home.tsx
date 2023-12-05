import { Link } from 'react-router-dom';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>Welcome page</h1>
      <div className={styles.buttonWrapper}>
        <button>
          <Link to={'main'}>MAIN</Link>
        </button>
        <button>
          <Link to={'sign-in'}>SIGNIN</Link>
        </button>
        <button>
          <Link to={'sign-up'}>SIGNUP</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
