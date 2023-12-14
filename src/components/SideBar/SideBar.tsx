import { useState } from 'react';
import Button from '@mui/material/Button';

import { SchemaExplorer } from '@/components/SchemaExplorer';
import styles from './SideBar.module.scss';

const SideBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.root}>
      <div className={open ? `${styles.panel} ${styles.open}` : styles.panel}>
        <Button className={styles.button} variant="contained" color="primary" onClick={handleClick}>
          Schema
        </Button>
        {open && <SchemaExplorer />}
      </div>
    </div>
  );
};

export default SideBar;
