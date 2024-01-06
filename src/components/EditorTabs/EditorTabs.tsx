import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { CodeEditor } from '@/components/CodeEditor';
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

type PropsEditorTabs = {
  initialVariables: string;
  initialHeaders: string;
  onChangeVariables(code: string): void;
  onChangeHeaders(code: string): void;
};

const EditorTabs: React.FC<PropsEditorTabs> = ({
  onChangeVariables,
  onChangeHeaders,
  initialVariables,
  initialHeaders,
}) => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const { state } = useLocale();
  const { strings } = state;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setOpen(true);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="tabs"
      >
        <Tab value={0} label={strings.tabsTitleVariables} />
        <Tab value={1} label={strings.tabsTitleHeaders} />
      </Tabs>
      <Button className={styles.button} onClick={handleClick}>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      {open && (
        <div className={styles.panel}>
          <TabPanel value={value} index={0}>
            <CodeEditor initialValue={initialVariables} onChange={onChangeVariables} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CodeEditor initialValue={initialHeaders} onChange={onChangeHeaders} />
          </TabPanel>
        </div>
      )}
    </>
  );
};

export default EditorTabs;
