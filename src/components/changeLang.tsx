
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { applyLanguageSettings } from '../utills/languageUtils';

function ChangeLang() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);


  useEffect(() => {
    applyLanguageSettings(lang, i18n);
  }, [lang]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(event.target.value);
  };


  return (
    <FormControl sx={{ minWidth: 200 }
    }>
      <InputLabel variant="standard" htmlFor="select-language" >
        {t('language')}
      </InputLabel>
      < NativeSelect
        value={lang}
        onChange={handleChange}
        inputProps={{
          name: 'language',
          id: 'select-language',
        }} >
        <option value={'en'}> English </option>
        < option value={'fa'} > فارسی </option>
      </NativeSelect>
    </FormControl>
  )
}

export default ChangeLang