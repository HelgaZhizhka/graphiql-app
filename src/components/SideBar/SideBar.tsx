import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { SchemaExplorer } from '@/components/SchemaExplorer';
import { CenteredTypography } from '@/components/CenteredTypography';
import styles from './SideBar.module.scss';

const SideBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { state } = useLocale();
  const { strings } = state;

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={open ? `${styles.root} ${styles.open}` : styles.root}>
      <Button className={styles.button} variant="contained" color="primary" onClick={handleClick}>
        {strings.schemaTitle}
      </Button>
      <div className={styles.panel}>
        {open && (
          <>
            <div className={styles.panelHeader}>
              <CenteredTypography>{strings.documentationTitle}</CenteredTypography>
              <IconButton
                aria-label="close"
                color="primary"
                className={styles.close}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className={styles.panelBody}>
              <Typography mb={2}>{strings.documentationSubTitle}</Typography>
              <SchemaExplorer />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
