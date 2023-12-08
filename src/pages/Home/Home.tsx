import { Link } from 'react-router-dom';

import styles from './Home.module.scss';
import { Box } from '@mui/material';
import { AboutUs } from '@/components/AboutUs';

const Home: React.FC = () => {
  return (
    <Box className="container">
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
      <h2 className={styles.title}>About Us</h2>
      <h4 className={styles.subTitle}>one for all and all for one!</h4>
      <AboutUs />
    </Box>
  );
};

export default Home;
