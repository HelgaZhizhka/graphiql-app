import { Link } from 'react-router-dom';

import styles from './SignUp.module.scss';

const SignUp = () => {
  return (
    <div className="container">
      <div className={styles.buttonWrapper}>
        <button>
          <Link to={'/'}>BACK</Link>
        </button>
      </div>
    </div>
  );
};

export default SignUp;
