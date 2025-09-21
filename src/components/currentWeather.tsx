import { Box, Skeleton, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CityContext } from "../context/cityContext";
import { useContext, useEffect, useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/fa';
import { LangContext } from "../context/languageContext";
import { fetchIcon, getCurrentWeather } from "../utills/fetchFunc";

function CurrentWeather() {

  const { selectedCity } = useContext(CityContext);
  const { lang } = useContext(LangContext);

  const [weather, setWeather] = useState(null)

  const weekday = dayjs().locale(`${lang}`).format("dddd");
  const date = dayjs().locale(`${lang}`).format("D MMM YYYY");
  const time = dayjs().locale(`${lang}`).format("HH:mm");

  const iconUrl = weather ? `${fetchIcon(weather?.WeatherIcon)}` : '';

  useEffect(() => {
    const fetchWeather = async () => {

      try {
        const data = await getCurrentWeather(selectedCity!.key);
        setWeather(data[0]);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    if (selectedCity?.key) {
      fetchWeather();
    }
    console.log(selectedCity)
  }, [selectedCity?.key]);


  return (
    <>
      {selectedCity === null || weather === null || selectedCity === undefined
        ? (<Skeleton variant="rectangular" width={210} height={118} />)
        : (
          <Box component={'div'} sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch'
          }}>
            <Box component={'div'} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box component={'div'} sx={(theme) => ({
                background: theme.palette.app.weatherBox,
                borderRadius: '50px', padding: '10px 13px', display: 'inline-flex',
                alignItems: 'center'
              }
              )}>
                <LocationOnIcon /> {selectedCity?.cityName}
              </Box>
              <Typography component={'h4'} variant="h4" sx={{ marginTop: '16px' }}>
                {weekday}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" component={'span'} sx={{ marginInlineEnd: '8px' }}>
                  {date}
                </Typography>
                <Typography variant="body2" component={'span'}>
                  {time}
                </Typography>
              </Box>
              <Typography variant="h4" component={'span'} sx={{ marginTop: '16px', fontWeight: 500 }}>
                {Math.floor(weather?.Temperature?.Metric.Value)}°
              </Typography>
            </Box>
            {/* --- */}
            <Box component={'div'}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box component={'img'} src={iconUrl} width={'100px'}
                alt={`${weather?.WeatherText} icon`}>
              </Box>
              <Typography variant="h5" component={'span'}>
                {weather?.WeatherText}
              </Typography>
            </Box>
          </Box >
        )
      }

    </>
  )
}

export default CurrentWeather