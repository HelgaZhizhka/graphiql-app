import { useState, lazy, Suspense } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { CenteredTypography } from '@/components/CenteredTypography';
import { DELAY } from '@/utils/constants';
import styles from './SideBar.module.scss';

const SchemaExplorer = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  return {
    default: (await import('@/components/SchemaExplorer')).SchemaExplorer,
  };
});

type Props = {
  isLoading: boolean;
};

const SideBar: React.FC<Props> = ({ isLoading }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={open ? `${styles.root} ${styles.open}` : styles.root}>
      <Button className={styles.button} variant="contained" color="primary" onClick={handleClick}>
        Schema
      </Button>
      <div className={styles.panel}>
        {open && (
          <>
            <div className={styles.panelHeader}>
              <CenteredTypography>Documentation Explorer</CenteredTypography>
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
              <Typography mb={2}>
                A GraphQL schema provides a root type for each kind of operation.
              </Typography>
              <Suspense fallback={<div>Schema coming soon...</div>}>
                <SchemaExplorer isLoading={isLoading} />
              </Suspense>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
