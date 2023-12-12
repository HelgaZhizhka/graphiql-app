import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useFormikContext } from 'formik';

import { testingPasswordStrength } from '@/utils/passwordStrength';
import { SignUpFormValues } from '@/utils/interfaces';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import styles from './PasswordStrengthMeter.module.scss';

const PasswordStrengthMeter: React.FC = () => {
  const { state } = useLocale();
  const { strings } = state;

  const { values } = useFormikContext<SignUpFormValues>();
  const { password } = values;

  const [strength, setStrength] = useState(0);

  useEffect(() => {
    setStrength(testingPasswordStrength(password));
  }, [password]);

  const color = strength === 10 ? 'success' : 'warning';
  const message = strength === 10 ? strings.strongPassword : strings.weakPassword;

  return (
    <>
      <LinearProgress variant="determinate" value={strength * 10} color={color} />
      <Typography className={styles[color]}>{message} </Typography>
    </>
  );
};

export default PasswordStrengthMeter;
