import { Box, Divider, Typography } from "@mui/material"
import type { ForecastType } from "../utills/types"
import dayjs from "dayjs"
import { useEffect, useState } from "react";
import { fetchIcon } from "../utills/fetchFunc";
import { useTranslation } from "react-i18next";


function SingleForecast(weather: ForecastType) {


  const { t, i18n } = useTranslation();
  const language = i18n.language;

  let averageTemp = (Math.floor(weather?.Temperature?.Minimum.Value) + Math.floor(weather?.Temperature.Maximum.Value)) / 2;
  const [iconUrl, setIconUrl] = useState<string>('');

  useEffect(() => {
    async function loadIcon() {
      if (weather?.Day.Icon != null) {
        const url = await fetchIcon(weather.Day.Icon);
        setIconUrl(url);
      } else {
        setIconUrl('');
      }
    }
    loadIcon();
  }, [])



  return (
    <Box component={'div'} sx={(theme) => ({
      borderRadius: '24px', backgroundColor: theme.palette.app.weatherBox,
      display: 'inline-flex', padding: '40px 20px', flexDirection: 'column',
      justifyContent: 'space-between', alignItems: 'center', gap: '10px'
    })}>
      <Box>
        <Typography sx={(theme) => ({ color: theme.palette.app.text })}>
          {language.startsWith('en') ? dayjs(weather?.Date).format('ddd')
            : t(`week.${dayjs(weather?.Date).format('dddd')}`)}
        </Typography>
        <Divider sx={{
          border: 0,
          borderTop: "2px solid",
          borderImageSource:
            "linear-gradient(90deg, rgba(54, 54, 54, 0) 0%, #7E7E7E 48.5%, rgba(54, 54, 54, 0) 100%)",
          borderImageSlice: 1,
        }} />
      </Box>
      <Box component={'img'} src={iconUrl} alt={`${weather?.Day.IconPhrase} icon`}
        maxWidth={'70px'}></Box>
      <Typography component={'span'} sx={(theme) => ({
        fontWeight: 500, fontSize: '18px', color: theme.palette.app.text
      })}>
        {Math.floor(averageTemp)}°{weather?.Temperature?.Minimum?.Unit}
      </Typography>
    </Box>
  )
}

export default SingleForecast