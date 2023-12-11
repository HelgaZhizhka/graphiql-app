import Container from '@mui/material/Container';

import { CenteredTypography } from '@/components/CenteredTypography';
import { AboutUs } from '@/components/AboutUs';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ p: '40px 0 100px' }}>
      <CenteredTypography className={styles.title} mt={2} variant="h3">
        Yes Code Team
      </CenteredTypography>
      <CenteredTypography className={styles.subTitle} variant="h5">
        one for all and all for one!
      </CenteredTypography>
      <AboutUs />
    </Container>
  );
};

export default Home;
