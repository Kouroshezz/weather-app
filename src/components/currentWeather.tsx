import { Box, Skeleton, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CityContext } from "../context/cityContext";
import { useContext, useEffect, useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/fa';

import { LangContext } from "../context/languageContext";
import { fetchIcon, getCurrentWeather } from "../utills/fetchFunc";
import type { WeatherType } from "../utills/types";
import i18next from "i18next";

function CurrentWeather() {

  const { selectedCity } = useContext(CityContext);
  const { lang } = useContext(LangContext);
  const language = i18next.language;

  const [weather, setWeather] = useState<WeatherType>();

  const d = new Date()
  const weekday = dayjs().locale(`${lang}`).format("dddd");
  const rtlDay = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    weekday: "long"
  }).format(d);
  const rtlDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(d);


  const iconUrl = weather ? `${fetchIcon(weather?.WeatherIcon)}` : '';

  useEffect(() => {
    const fetchWeather = async () => {

      try {
        const data = await getCurrentWeather(selectedCity!.key, language);
        setWeather(data[0]);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    if (selectedCity?.key) {
      fetchWeather();
    }
  }, [selectedCity?.key, language]);


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
                alignItems: 'center', color: theme.palette.app.text
              }
              )}>
                <LocationOnIcon /> {selectedCity?.cityName}
              </Box>
              <Typography component={'h4'} variant="h4" sx={(theme) => ({ marginTop: '16px', color: theme.palette.app.text })}>
                {language === 'en' ? weekday : rtlDay}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" component={'span'} sx={(theme) => ({ marginInlineEnd: '8px', color: theme.palette.app.text })}>
                  {language == 'en' ? dayjs(weather?.LocalObservationDateTime).format('DD MMM YYYY')
                    : rtlDate}
                </Typography>
                <Typography variant="body2" component={'span'} sx={(theme) => ({ color: theme.palette.app.text })}>
                  {dayjs(weather?.LocalObservationDateTime).format('HH:mm')}
                </Typography>
              </Box>
              <Typography variant="h4" component={'span'} sx={(theme) => ({
                color: theme.palette.app.text, marginTop: '16px',
                fontWeight: 500
              })}>
                {Math.floor(weather?.Temperature.Metric.Value)}°
                {weather?.Temperature?.Metric.Unit}
              </Typography>
            </Box>
            {/* --- */}
            <Box component={'div'}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box component={'img'} src={weather?.WeatherIcon ? iconUrl : ''} width={'100px'}
                alt={`${weather?.WeatherText} icon`}>
              </Box>
              <Typography variant="h5" component={'span'} sx={(theme) => ({ color: theme.palette.app.text })} >
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