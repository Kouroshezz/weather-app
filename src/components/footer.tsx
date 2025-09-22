import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import favIcon from '../assets/fav-icon.png'
import { ThemeContext } from "../context";
import { useTranslation } from "react-i18next";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import dayjs from "dayjs";

function Footer() {

  const { theme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const language = i18n.language;


  const dateJalali = new Intl.DateTimeFormat('fa-IR', {
    timeZone: 'Asia/Tehran',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Box component={'footer'}
      sx={{
        padding: '20px 24px',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
        background: theme === 'light' ?
          'linear-gradient(90deg, #F3FAFE 0%, rgba(204, 221, 221, 0.619608) 51%, #F3FAFE 100%)'
          : 'linear-gradient(90deg, #292F45 0%, #3F4861 50.5%, #151D32 98%)',
      }}>
      <Box component={'div'} sx={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
        <Box component={'img'} src={favIcon} width={'50px'} ></Box>
        <Typography sx={(theme) => ({ color: theme.palette.app.text, fontSize: '14px' })}>
          {t('copy_right')}
        </Typography>
      </Box>
      {/* --- */}
      <Box sx={{
        display: 'inline-flex', gap: '20px', alignItems: 'center', marginTop: { xs: '5px', md: 0 },
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        <Box component={'div'} sx={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <MailOutlinedIcon sx={(theme) => ({ color: theme.palette.app.text })} />
          <Typography component={'a'} href={"mailto:info@nadin.ir"}
            sx={(theme) => ({ color: theme.palette.app.text, fontSize: '14px' })}>
            {t('contact_us')} : info@nadin.ir </Typography>
        </Box>
        <Box component={'div'} sx={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <CalendarMonthOutlinedIcon sx={(theme) => ({ color: theme.palette.app.text })} />
          <Typography sx={(theme) => ({ color: theme.palette.app.text, fontSize: '14px' })}>
            {language === 'en' ? dayjs().format('HH:MM DD/MMM/YYYY') : dateJalali.format(new Date())}

          </Typography>
        </Box>
      </Box>
    </Box >
  )
}

export default Footer