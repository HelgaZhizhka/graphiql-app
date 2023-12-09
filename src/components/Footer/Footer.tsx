import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';

import { infoAboutPerson } from '@/utils/infoAboutPerson';
import { CenteredTypography } from '@/components/CenteredTypography';
import styles from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={`footer ${styles.root}`}>
    <Container maxWidth="lg">
      <CenteredTypography className={styles.title} mb={2}>
        Yes Code Team:
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
      </CenteredTypography>
      <p>
        © 2023
        <a
          className={styles.linkSecondary}
          href="https://rollingscopes.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Rolling Scopes
        </a>
      </p>
    </Container>
  </footer>
);

export default Footer;
