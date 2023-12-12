import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useFormikContext } from 'formik';

import { testingPasswordStrength } from '@/utils/passwordStrength';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { SignUpFormValues } from '@/components/SignUpForm/SignUpForm';

const PasswordStrengthMeter: React.FC = () => {
  const { state } = useLocale();
  const { strings } = state;

  const { values } = useFormikContext<SignUpFormValues>();
  const { password } = values;

  const [strength, setStrength] = useState(0);

  useEffect(() => {
    setStrength(testingPasswordStrength(password));
  }, [password]);

  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={strength * 10}
        color={strength === 10 ? 'success' : 'warning'}
      />
      <Typography color="secondary">
        {strength === 10 ? `${strings.strongPassword}` : `${strings.weakPassword}`}
      </Typography>
    </div>
  );
};

export default PasswordStrengthMeter;
