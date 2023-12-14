import { useState } from 'react';

import styles from './CodeEditor.module.scss';

type Props = {
  initialValue: string;
  onChange?(value: string): void;
  readOnly?: boolean;
};

const CodeEditor: React.FC<Props> = ({ initialValue, onChange, readOnly = false }) => {
  const [value, setValue] = useState(initialValue);
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({ target: { value } }) => {
    setValue(value);
    onChange && onChange(value);
  };

  return (
    <textarea className={styles.root} value={value} onChange={handleChange} readOnly={readOnly} />
  );
};

export default CodeEditor;
