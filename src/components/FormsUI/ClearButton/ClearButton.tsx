import { useFormikContext } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import styles from './ClearButton.module.scss';

const ClearButton: React.FC = () => {
  const { setFieldValue } = useFormikContext();

  const handleClear = () => {
    setFieldValue('url', '');
  };

  return (
    <IconButton aria-label="delete" color="primary" className={styles.root} onClick={handleClear}>
      <CloseIcon />
    </IconButton>
  );
};

export default ClearButton;
