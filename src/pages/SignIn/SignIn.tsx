import { Link } from 'react-router-dom';

import styles from './SignIn.module.scss';

const SignIn = () => {
  return (
    <div className={styles.buttonWrapper}>
      <button>
        <Link to={'/'}>BACK</Link>
      </button>
    </div>
  );
};

export default SignIn;
