import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { infoAboutPerson } from '@/utils/infoAboutPerson';
import styles from './AboutUs.module.scss';

const AboutUs = () => (
  <>
    {infoAboutPerson.map((person, index) => (
      <div key={index}>
        <Box
          sx={{
            display: 'flex',
            m: '40px 0',
            gap: '60px',
            flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            justifyContent: 'center',
          }}
        >
          <Box mt={4}>
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
              <p>Role: {person.role}</p>
              <p>
                <em>Age:</em> {person.age} years old
                <br />
                <em>Personality:</em> {person.personality}
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
        {index < infoAboutPerson.length - 1 && <Divider />}
      </div>
    ))}
  </>
);

export default AboutUs;
