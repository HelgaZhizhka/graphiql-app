import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SelectLanguage: React.FC = () => {
  const [lang, setLang] = useState('en');

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };

  return (
    <Box mr={2} sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel size="small">Lang</InputLabel>
        <Select
          size="small"
          labelId="selectLanguage"
          id="selectLanguage"
          value={lang}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value={'en'}>En</MenuItem>
          <MenuItem value={'ru'}>Ru</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectLanguage;
