import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './EditorTabs.module.scss';

interface Props {
  index: number;
  value: number;
  children?: React.ReactNode;
}

const TabPanel: React.FC<Props> = ({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} aria-labelledby={`tab-${index}`} {...other}>
    {value === index && children}
  </div>
);

const EditorTabs: React.FC = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setOpen(true);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="tabs"
      >
        <Tab value={0} label="Query Variables" />
        <Tab value={1} label="HTTP Headers" />
      </Tabs>
      <Button className={styles.button} onClick={handleClick}>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      {open && (
        <div className={styles.panel}>
          <TabPanel value={value} index={0}>
            Query Variables
          </TabPanel>
          <TabPanel value={value} index={1}>
            HTTP Headers
          </TabPanel>
        </div>
      )}
    </div>
  );
};

export default EditorTabs;
