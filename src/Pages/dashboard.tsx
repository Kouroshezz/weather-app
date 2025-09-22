import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router';
import { ThemeContext } from '../context';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import Logo from '../assets/logo.png';
import SettingsIcon from '@mui/icons-material/Settings';
import CitiesList from '../components/citiesList';
import CurrentWeather from '../components/currentWeather';
import ContextMenu from '../components/contextMenu';
import { useTranslation } from 'react-i18next';
import TemperatureChart from '../components/historicalChart';
import { CityContext } from '../context/cityContext';
import WeatherForecast from '../components/forecastWeather';
import Footer from '../components/footer';


function Dashboard() {

  let navigate = useNavigate();

  let { username } = useContext(ThemeContext);
  const { selectedCity } = useContext(CityContext)

  const settingRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation()
  const showMenu = () => {
    if (menuRef?.current) menuRef.current.style.display = 'inline-flex';
  };

  const hideMenu = (e: React.FocusEvent<HTMLDivElement>) => {
    if (menuRef.current && settingRef.current &&
      !settingRef.current.contains(e.relatedTarget as Node) &&
      !menuRef.current.contains(e.relatedTarget as Node)) {
      menuRef.current.style.display = 'none';
    }
  };

  useEffect(() => {
    (!username || username == undefined) && navigate('/')
  }, [username])

  return (
    <>
      <Box className='dashboard-header'
        sx={(them) => ({
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.2rem 2.4rem', backgroundColor: them.palette.background.default,
          flexWrap: { xs: 'wrap', md: 'nowrap' }, boxShadow: '0px 4px 10px 0px #00000026'
        })}>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <img src={Logo} />
          <Typography variant='body2' component='span'
            sx={(theme) => ({ marginInlineStart: '8px', color: theme.palette.app.text })}>
            {t("dashboard")}
          </Typography>
        </Box >
        <Box sx={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: '20px', flexWrap: 'wrap',
          width: { xs: '100%', md: 'auto' }, marginTop: { xs: '20px', md: 0 }
        }}>
          <CitiesList />
          <Box component={'div'} sx={{ position: 'relative' }} ref={settingRef} tabIndex={0}
            onFocus={showMenu}
            onBlur={hideMenu}
          >
            <SettingsIcon sx={{
              padding: '11px', color: '#BBC1C4', borderRadius: '8px',
              border: '1px solid #BBC1C4', fontSize: '55px',
            }} />
            <ContextMenu ref={menuRef} />
          </Box>
        </Box>
      </Box >
      <Box component={'main'} sx={(theme) => ({
        background: theme.palette.background.default,
        padding: '20px'
      })}>
        <Grid container spacing={{ xs: '5px', md: '40px' }} sx={{}}>
          <Grid size={{ xs: 12, md: 5 }} sx={(theme) => ({
            boxShadow: '0px 4px 10px 0px #00000026;',
            backgroundColor: theme.palette.app.box,
            borderRadius: '24px', padding: '20px',
            mt: { xs: 2, md: 0 }
          })}>
            <CurrentWeather />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}
            sx={(theme) => ({
              boxShadow: '0px 4px 10px 0px #00000026;',
              backgroundColor: theme.palette.app.box,
              borderRadius: '24px', padding: '20px',
              mt: { xs: 2, md: 0 }
            })}>
            {selectedCity ? <TemperatureChart />
              : <Skeleton variant="rectangular" width={'100%'} height={118} />}
          </Grid>
        </Grid>
        <div style={{ marginTop: '30px' }}></div>
        <Box sx={(theme) => ({
          background: theme.palette.app.box,
          padding: '24px 20px',
          borderRadius: '24px',
          boxShadow: '0px 4px 10px 0px #00000026',

        })}>
          {selectedCity ? <WeatherForecast /> : (
            <Box component={'div'} sx={{ display: 'flex', gap: '18px' }}>
              {Array(5).fill(0).map((_, index) => (
                <Skeleton key={index} variant='rectangular' width={'120px'} height={'200px'} />
              ))}
            </Box>
          )}
        </Box>
      </Box >
      <Footer />
    </>
  )
}

export default Dashboard
