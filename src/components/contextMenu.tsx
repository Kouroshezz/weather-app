import { Box, Divider, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


type ContextMenuProps = {
  ref?: React.Ref<HTMLDivElement>;
};


function ContextMenu({ ref }: ContextMenuProps) {

  let { changeTheme, theme, logout } = useContext(ThemeContext);

  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <Paper elevation={8} sx={{
      borderRadius: '8px', display: 'none',
      flexDirection: 'column', padding: '8px 16px', position: 'absolute',
      right: lang === 'en' ? '50%' : 'auto', top: '110%', left: lang === 'en' ? 'auto' : '50%'
    }} ref={ref}>
      <Typography component={'p'} sx={{ marginBottom: '10px' }}>
        {t('mode')}
      </Typography>
      {/* light mode butotn */}
      <Box sx={{ display: 'flex', alignItems: 'center' }} >
        <Box sx={(muiTheme) => ({
          display: "flex",
          alignItems: "center",
          borderRadius: "4px 0 0 4px",
          padding: "10px 21px",
          border: "1px solid",
          borderColor: theme === "light"
            ? muiTheme?.palette.primary.main : "#8895A0",
          cursor: "pointer",
          color: theme === "light"
            ? muiTheme?.palette.primary.main : "#8895A0",
        })}
          onClick={() => changeTheme('light')}>
          <WbSunnyOutlinedIcon sx={{ marginInlineEnd: '8px' }} />
          <Typography >{t('light')}</Typography>
        </Box>
        {/* dark mode button */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}
          onClick={() => changeTheme('dark')}>
          <Box sx={(muiTheme) => ({
            display: "flex",
            alignItems: "center",
            borderRadius: "4px 0 0 4px",
            padding: "10px 21px",
            border: "1px solid",
            borderColor: theme === "dark"
              ? muiTheme?.palette.primary.main : "#8895A0",
            cursor: "pointer",
            color: theme === "dark"
              ? muiTheme?.palette.primary.main : "#8895A0",
          })}>
            <BedtimeOutlinedIcon sx={{ marginInlineEnd: '8px' }} />
            <Typography >{t('dark')}</Typography>
          </Box>
          <Divider />
        </Box>
      </Box>
      {/* ---   language change --- */}
      <Divider sx={{ margin: '12px 0', backgroundColor: '#AFBCC4' }} />
      <Typography component={'p'} >
        {t('language')}
      </Typography>
      {/* en mode butotn */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }} >
        <Box sx={(muiTheme) => ({
          borderRadius: "4px 0 0 4px",
          padding: "10px 21px",
          border: "1px solid",
          borderColor: i18next.language === "en"
            ? muiTheme?.palette.primary.main : "#8895A0",
          cursor: "pointer",
          color: i18next.language === "en"
            ? muiTheme?.palette.primary.main : "#8895A0",
          width: '50%',
          textAlign: 'center'
        })}
          onClick={() => setLang('en')}>
          <Typography >En</Typography>
        </Box>
        {/* fa mode button */}

        <Box sx={(muiTheme) => ({
          borderRadius: "4px 0 0 4px",
          padding: "10px 21px",
          border: "1px solid",
          borderColor: i18next.language === "fa"
            ? muiTheme?.palette.primary.main : "#8895A0",
          cursor: "pointer",
          color: i18next.language === "fa"
            ? muiTheme?.palette.primary.main : "#8895A0",
          width: '50%',
          textAlign: 'center'
        })}
          onClick={() => setLang('fa')}
        >
          <Typography >Fa</Typography>
        </Box>
      </Box>

      {/* ------ */}
      <Divider sx={{ margin: '12px 0', backgroundColor: '#AFBCC4' }} />
      <Box component={'div'} onClick={logout}
        sx={(theme) => ({
          display: 'flex', alignItems: 'center', cursor: 'pointer',
          padding: '10px 0'
        })}>
        <LogoutOutlinedIcon
          sx={{ direction: lang === 'en' ? 'ltr' : 'rtl' }} /> {t('exit')}
      </Box>
    </Paper>
  )
}

export default ContextMenu