import { Box, Divider, Typography } from "@mui/material"
import type { SingleWeatherCard } from "../utills/types"
import dayjs from "dayjs"
import { useTranslation } from "react-i18next";


function SingleForecast(weather: SingleWeatherCard) {


  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Box component={'div'} sx={(theme) => ({
      borderRadius: '24px', backgroundColor: theme.palette.app.weatherBox,
      display: 'inline-flex', padding: '40px 20px', flexDirection: 'column',
      justifyContent: 'space-between', alignItems: 'center', gap: '10px'
    })}>
      <Box>
        <Typography sx={(theme) => ({ color: theme.palette.app.text })}>
          {language.startsWith('en') ? dayjs(weather?.date).format('ddd')
            : t(`week.${dayjs(weather?.date).format('dddd')}`)}
        </Typography>
        <Divider sx={{
          border: 0,
          borderTop: "2px solid",
          borderImageSource:
            "linear-gradient(90deg, rgba(54, 54, 54, 0) 0%, #7E7E7E 48.5%, rgba(54, 54, 54, 0) 100%)",
          borderImageSlice: 1,
        }} />
      </Box>
      <Box component={'img'} src={`https:${weather?.day?.condition?.icon}`}
        alt={`${weather?.day?.condition?.text} icon`}
        maxWidth={'70px'}></Box>
      <Typography component={'span'} sx={(theme) => ({
        fontWeight: 500, fontSize: '18px', color: theme.palette.app.text
      })}>
        {Math.floor(weather?.day?.avgtemp_c)}&#8451;
      </Typography>
    </Box>
  )
}

export default SingleForecast