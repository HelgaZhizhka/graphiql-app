import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { CenteredTypography } from '@/components/CenteredTypography';
import { AboutUs } from '@/components/AboutUs';
import styles from './Home.module.scss';
import { AuthLinks } from '@/components/AuthLinks';

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ p: '40px 20px 100px' }}>
      <CenteredTypography className={styles.heading} mt={2} mb={2} variant="h2" color="purple">
        Welcome to GRAPHIQL
      </CenteredTypography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AuthLinks type="link" />
      </Box>
      <CenteredTypography className={styles.title} mt={10} variant="h3">
        Project created by team Yes Code
      </CenteredTypography>
      <CenteredTypography className={styles.subTitle} variant="h5">
        one for all and all for one!
      </CenteredTypography>
      <AboutUs />
    </Container>
  );
};

export default Home;
