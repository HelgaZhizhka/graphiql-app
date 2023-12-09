import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { RoutePaths } from '@/routes/routes.enum';
import { CenteredTypography } from '@/components/CenteredTypography';
import styles from './NotFoundPage.module.scss';

const NotFoundPage: React.FC = () => (
  <Container maxWidth="sm" sx={{ p: '40px 0' }} className={styles.root}>
    <Box mt={2} className={styles.title}>
      401
    </Box>
    <CenteredTypography variant="h4">Sorry, there&apos;s nothing here 🥲</CenteredTypography>
    <Link to={RoutePaths.WELCOME} className={styles.link}>
      Back
    </Link>
  </Container>
);

export default NotFoundPage;
