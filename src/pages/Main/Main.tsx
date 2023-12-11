import Container from '@mui/material/Container';

import { CenteredTypography } from '@/components/CenteredTypography';

const Main = () => {
  return (
    <Container sx={{ pb: '100px' }}>
      <CenteredTypography mt={4} variant="h3">
        Editor
      </CenteredTypography>
    </Container>
  );
};

export default Main;
