import { Box, Skeleton, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CityContext } from "../context/cityContext";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fa";

import { LangContext } from "../context/languageContext";
import { getCurrentWeather } from "../utills/fetchFunc";
import type { currentWeatherType } from "../utills/types";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

function CurrentWeather() {
  const { selectedCity } = useContext(CityContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation();
  const language = i18next.language;

  // start with null so checks are simple
  const [weather, setWeather] = useState<currentWeatherType | null>(null);

  const d = new Date();
  const weekday = dayjs().locale(`${lang}`).format("dddd");
  const rtlDay = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    weekday: "long",
  }).format(d);
  const rtlDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);

  useEffect(() => {
    const cityName = selectedCity?.cityName;

    if (!cityName) {
      setWeather(null);
      return;
    }
    (async () => {
      try {
        const data = await getCurrentWeather(cityName);
        setWeather(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setWeather(null);
      }
    })();
  }, [selectedCity?.cityName, language]);

  const localtime = weather?.location?.localtime ?? new Date().toISOString();
  const iconUrl = weather?.current?.condition?.icon
    ? weather.current.condition.icon.replace(/^\/\//, "https://")
    : "";

  const tempC = weather?.current?.temp_c;
  const tempDisplay = typeof tempC === "number" ? Math.floor(tempC) : undefined;

  const isLoading = !selectedCity || !weather;

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rectangular" width={210} height={118} />
      ) : (
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "stretch" }}
        >
          <Box component={"div"} sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              component={"div"}
              sx={(theme) => ({
                background: theme.palette.app.weatherBox,
                borderRadius: "50px",
                padding: "10px 13px",
                display: "inline-flex",
                alignItems: "center",
                color: theme.palette.app.text,
              })}
            >
              <LocationOnIcon /> {selectedCity?.cityName}
            </Box>

            <Typography
              component={"h4"}
              variant="h4"
              sx={(theme) => ({ marginTop: "16px", color: theme.palette.app.text })}
            >
              {language.startsWith("en") ? weekday : rtlDay}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                component={"span"}
                sx={(theme) => ({ marginInlineEnd: "8px", color: theme.palette.app.text })}
              >
                {language.startsWith("en")
                  ? dayjs(localtime).format("DD MMM YYYY")
                  : rtlDate}
              </Typography>
              <Typography
                variant="body2"
                component={"span"}
                sx={(theme) => ({ color: theme.palette.app.text })}
              >
                {dayjs(localtime).format("HH:mm")}
              </Typography>
            </Box>

            <Typography
              variant="h4"
              component={"span"}
              sx={(theme) => ({
                color: theme.palette.app.text,
                marginTop: "16px",
                fontWeight: 500,
                direction: "ltr",
                textAlign: language.startsWith("en") ? "left" : "right",
              })}
            >
              {tempDisplay ?? "--"}
              <small>&#8451;</small>
            </Typography>
          </Box>

          <Box
            component={"div"}
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}
          >
            <Box
              component={"img"}
              src={iconUrl}
              width={"100px"}
              alt={`${weather?.current?.condition?.text ?? ""} icon`}
            />
            <Typography variant="h5" component={"span"} sx={(theme) => ({ color: theme.palette.app.text })}>
              {t(`condition.${weather?.current?.condition?.text}`) ?? ""}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}

export default CurrentWeather;
