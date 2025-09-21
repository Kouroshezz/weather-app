import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { ThemeContext } from '../context';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import Logo from '../assets/logo.png';
import SettingsIcon from '@mui/icons-material/Settings';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import CitiesList from '../components/citiesList';
import CurrentWeather from '../components/currentWeather';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

function Dashboard() {

  let navigate = useNavigate();

  let { username, theme, changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    !username && navigate('/')
  }, [username])

  return (
    <>
      <Box className='dashboard-header'
        sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.2rem 2.4rem'
        }}>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <img src={Logo} />
          <Typography variant='body2' component='span'
            sx={{ marginInlineStart: '8px' }}>
            weather dshbaord
          </Typography>
        </Box >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <CitiesList />

          <SettingsIcon sx={{
            padding: '11px', color: '#BBC1C4', borderRadius: '8px',
            border: '1px solid #BBC1C4', fontSize: '50px',
          }}
          />
        </Box>
      </Box >
      <Box component={'main'} sx={(theme) => ({
        background: theme.palette.background.default,
        padding: '20px'
      })}>
        <Grid container spacing={'40px'} sx={{}}>
          <Grid item size={{ xs: 12, md: 5 }} sx={(theme) => ({
            boxShadow: '0px 4px 10px 0px #00000026;',
            backgroundColor: theme.palette.app.box,
            borderRadius: '24px', padding: '20px',
            mt: { xs: 5, md: 0 }
          })}>
            <CurrentWeather />
          </Grid>
          <Grid item size={{ xs: 12, md: 7 }}
            sx={(theme) => ({
              boxShadow: '0px 4px 10px 0px #00000026;',
              backgroundColor: theme.palette.app.box,
              borderRadius: '24px', padding: '20px',
              mt: { xs: 5, md: 0 }
            })}>

          </Grid>
        </Grid>
      </Box >
      <Paper elevation={8} sx={{
        borderRadius: '8px', display: 'inline-flex',
        flexDirection: 'column', padding: '8px 16px', color: '#8895A0'
      }}>
        <Typography component={'p'} sx={{ marginBottom: '10px' }}>
          Mode
        </Typography>
        {/* light mode butotn */}
        <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => changeTheme('light')}>
          <Box sx={{
            display: 'flex', alignItems: 'center',
            borderRadius: '4px 0 0 4px', padding: '10px 21px', border: '1px solid #8895A0'
          }}>
            <WbSunnyOutlinedIcon sx={{ marginInlineEnd: '8px' }} />
            <Typography >Light</Typography>
          </Box>
          {/* dark mode button */}
          <Box sx={{ display: 'flex', alignItems: 'center' }} oncClick={() => changeTheme('dark')}>
            <Box sx={{
              display: 'flex', alignItems: 'center',
              borderRadius: '4px 0 0 4px', padding: '10px 21px', border: '1px solid #8895A0'
            }}>
              <BedtimeOutlinedIcon sx={{ marginInlineEnd: '8px' }} />
              <Typography >Dark</Typography>
            </Box>
            <Divider />
          </Box>
          <Divider />
        </Box>
      </Paper>
    </>
  )
}

export default Dashboard


// <WbSunnyOutlinedIcon sx={{ marginInlineEnd: '8px' }} />
//           <Typography >Light</Typography>