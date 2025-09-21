
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function ChangeLang() {

  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

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