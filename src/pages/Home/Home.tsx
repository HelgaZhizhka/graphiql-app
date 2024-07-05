import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { CenteredTypography } from '@/components/CenteredTypography';
import { AboutUs } from '@/components/AboutUs';
import { AuthLinks } from '@/components/AuthLinks';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const { state } = useLocale();
  const { strings } = state;

  return (
    <Container maxWidth="lg" sx={{ p: '40px 20px 100px' }}>
      <CenteredTypography className={styles.heading} mt={2} mb={2} variant="h2" color="purple">
        {strings.welcomeHeader}
      </CenteredTypography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AuthLinks type="link" />
      </Box>
      <CenteredTypography className={styles.title} mt={4} variant="h3">
        {strings.welcomePageCreatersInfo}
      </CenteredTypography>
      <CenteredTypography className={styles.subTitle} variant="h5">
        {strings.teamMotto}
      </CenteredTypography>
      <AboutUs />
    </Container>
  );
};

export default Home;
