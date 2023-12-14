import { useState } from 'react';
import TextField from '@mui/material/TextField';

import styles from './InputEndpoint.module.scss';

type Props = {
  initialValue: string;
  onSubmit(value: string): void;
};

const InputEndpoint: React.FC<Props> = ({ initialValue, onSubmit }) => {
  const [value, setValue] = useState(initialValue);

  //TODO validation url input

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        className={styles.root}
        value={value}
        label="Type api"
        variant="outlined"
        onChange={handleChange}
        size="small"
      />
    </form>
  );
};

export default InputEndpoint;
