import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import sunny from '../assets/Sun cloud angled rain.png';
import windy from '../assets/Moon cloud fast wind.png';
import rainy from '../assets/Moon cloud mid rain.png';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import ChangeLang from '../components/changeLang';


function LandingPage() {

  const { t } = useTranslation();

  const { theme, username, setUsername } = useContext(ThemeContext);
  const [getname, setGetname] = useState<string>('');
  let navigate = useNavigate();


  const Login = () => {
    setUsername(getname);
    getname !== '' && navigate('/dashboard')
  }

  useEffect(() => {
    username && username !== '' && navigate('/dashboard')
  }, [username])



  return (
    <>
      <Box sx={(theme) => ({
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        height: '100vh', flexDirection: 'column', gap: 5,
        backgroundColor: theme.palette.background.default,
      })}>
        <Grid container={true} justifyContent='center' alignItems='center'
          sx={{
            boxShadow: 3, borderRadius: '12px',
            width: { xs: '90vw', md: '70%' }, overflow: 'hidden',
            backgroundColor: theme === 'light' ? '#D3E1E7' : '#404961',
          }}
        >
          <Grid size={{ xs: 12, md: 7 }} component={'div'}
            height={'100%'}
            sx={(theme) => ({
              backgroundColor: theme.palette.background.paper,
            })}>
            <form style={{ padding: '50px', height: '100%' }}>
              <Typography variant="h5" component="h4" sx={(theme) => ({
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 2,
                color: theme.palette.app.text
              })}>
                {t('login')}
              </Typography>
              <TextField id="outlined-basic" label={t('enter_name')} variant="outlined"
                fullWidth onKeyDown={(e: any) => setGetname(e?.target?.value)} />
              <Button variant="contained" fullWidth
                onClick={Login}
                sx={{ mt: '150px', padding: '15px 0' }}>
                {t('login')}
              </Button>
            </form>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }} className='login-img'>
            <Box component={'div'} sx={{
              display: 'grid', alignItems: 'center', justifyContent: 'center',
              gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)',
              gap: 1, padding: 2, mt: 3
            }}>
              <Box component={'div'} sx={{ gridRow: 'span 2 / span 2' }}>
                <img src={sunny} className='img-responsive ' />
              </Box>
              <Box component={'div'} sx={{ alignSelf: 'start' }}>
                <img src={windy} className='img-responsive ' />
              </Box>
              <Box component={'div'} sx={{ gridColumnStart: 2, gridRowStart: 2 }}>
                <img src={rainy} className='img-responsive login-img-shadows' />
              </Box>
            </Box>
          </Grid>
        </Grid >
        <ChangeLang />
      </Box >
    </>
  )
}

export default LandingPage