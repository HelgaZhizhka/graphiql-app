import { useFormikContext } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import styles from './ClearButton.module.scss';

type Props = {
  onClear(): void;
};

const ClearButton: React.FC<Props> = ({ onClear }) => {
  const { setFieldValue } = useFormikContext();

  const handleClear = () => {
    setFieldValue('url', '');
    onClear();
  };

  return (
    <IconButton
      data-testid="Close"
      aria-label="delete"
      color="primary"
      className={styles.root}
      onClick={handleClear}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default ClearButton;
