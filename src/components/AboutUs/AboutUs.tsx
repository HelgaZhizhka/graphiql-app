import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { Person } from '@/utils/interfaces';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import styles from './AboutUs.module.scss';

const AboutUs: React.FC = () => {
  const { state } = useLocale();
  const { strings } = state;

  const persons: Person[] = strings.persons as Person[];

  return (
    <>
      {persons.map((person, index) => (
        <div key={index}>
          <Box
            sx={{
              display: 'flex',
              m: { md: '40px 0' },
              gap: { md: '60px', xs: '20px' },
              flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row',
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              justifyContent: 'center',
            }}
          >
            <Box mt={2}>
              <video
                autoPlay
                loop
                muted
                playsInline
                disableRemotePlayback
                disablePictureInPicture
                className={index % 2 !== 0 ? styles.personVideoEven : styles.personVideoOdd}
              >
                <source src={person.videoSource} type="video/mp4" />
              </video>
            </Box>

            <Box>
              <Box>
                <strong className={styles.name}>{person.name}</strong>
                <p>
                  {strings.role}: {person.role}
                </p>
                <p>
                  <em>{strings.age}:</em> {person.age}
                  <br />
                  <em>{strings.personality}:</em> {person.personality}
                </p>
                <Box dangerouslySetInnerHTML={{ __html: person.presentation }}></Box>
              </Box>

              <a
                href={person.gitHubLink}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className={styles.icon} />
                {person.name}
              </a>
            </Box>
          </Box>
          {index < persons.length - 1 && <Divider />}
        </div>
      ))}
    </>
  );
};

export default AboutUs;
