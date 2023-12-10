import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { REGIONS } from '@/contexts/Locale/constants';
import LanguageContext from '@/contexts/LanguageContext';

const SelectLanguage: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const [lang, setLang] = useState(language);

  const { state, dispatch } = useLocale();
  const { strings } = state;

  const handleRegionChange = (region: string) => {
    const action = {
      type: 'CHANGE_LOCALE',
      payload: {
        region,
      },
    };

    dispatch(action);
    setLang(region);
  };

  return (
    <Box mr={2} sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel size="small">{strings.language}</InputLabel>
        <Select
          size="small"
          labelId="selectLanguage"
          id="selectLanguage"
          value={lang}
          label="Language"
        >
          {Object.keys(REGIONS).map((region) => (
            <MenuItem key={region} value={region} onClick={() => handleRegionChange(region)}>
              {region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectLanguage;
