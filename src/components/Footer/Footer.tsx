import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { CenteredTypography } from '@/components/CenteredTypography';
import rsLogo from '@/assets/images/rsSchool.svg';
import logoTeam from '@/assets/images/logoTeam.png';
import styles from './Footer.module.scss';
import { Person } from '@/utils/interfaces';

const Footer: React.FC = () => {
  const { state } = useLocale();
  const { strings } = state;
  const persons: Person[] = strings.persons as Person[];

  return (
    <footer className={`footer ${styles.root}`}>
      <Container maxWidth="lg">
        <div className={styles.col}>
          <Typography>{strings.created} 2023 ©</Typography>
          <CenteredTypography>
            <span className={styles.title}>
              Yes Code
              <img className={styles.logoTeam} src={logoTeam} alt="Yes Code Team" />
            </span>
          </CenteredTypography>
          <a href="https://rs.school/react/" target="_blank" rel="noopener noreferrer">
            <img className={styles.logo} src={rsLogo} alt="RS School" />
          </a>
        </div>
        <Divider sx={{ margin: '10px 0 20px' }} />
        <div className={styles.contacts}>
          {persons.map((person) => (
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
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
