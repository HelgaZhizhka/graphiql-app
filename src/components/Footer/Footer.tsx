import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';

import { infoAboutPerson } from '@/utils/infoAboutPerson';
import { CenteredTypography } from '@/components/CenteredTypography';
import rsLogo from '@/assets/images/rsSchool.svg';
import styles from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={`footer ${styles.root}`}>
    <Container maxWidth="lg">
      <CenteredTypography className={styles.title}>Yes Code Team:</CenteredTypography>
      {infoAboutPerson.map((person) => (
        <a
          className={styles.link}
          href={person.gitHubLink}
          target="_blank"
          rel="noopener noreferrer"
          key={person.name}
        >
          <GitHubIcon className={styles.icon} />
          {person.name}
        </a>
      ))}
      <Divider sx={{ margin: '10px 0 20px' }} />
      <Typography mb={2}>
        Created in 2023
        <a href="https://rs.school/react/" target="_blank" rel="noopener noreferrer">
          <img className={styles.logo} src={rsLogo} alt="RS School" />
        </a>
      </Typography>
      <Typography>© All rights reserved.</Typography>
    </Container>
  </footer>
);

export default Footer;
