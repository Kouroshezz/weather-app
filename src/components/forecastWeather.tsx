import { useContext, useEffect, useState } from "react";
import { CityContext } from "../context/cityContext";
import { getWeatherForecast } from "../utills/fetchFunc";
import type { SingleWeatherCard, WeatherForecastType } from "../utills/types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SingleForecast from "./singleForecast";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function WeatherForecast() {
  const { selectedCity } = useContext(CityContext);
  const [days, setDays] = useState<SingleWeatherCard[] | null>(null);
  const { t } = useTranslation();

  const settings = {
    infinite: false,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 10,
    // rtl: !i18n.language.startsWith("en"),
    slidesToScroll: 2,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 10, slidesToScroll: 3, infinite: true } },
      { breakpoint: 600, settings: { slidesToShow: 4, slidesToScroll: 2, initialSlide: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 3, slidesToScroll: 2 } },
    ]
  }

  useEffect(() => {
    const cityName = selectedCity?.cityName;
    if (!cityName) {
      setDays(null);
      return;
    }

    (async () => {
      try {
        const data: WeatherForecastType = await getWeatherForecast(cityName);
        setDays(data.forecast.forecastday); // <-- array of SingleWeatherCard
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
        setDays(null);
      }
    })();
  }, [selectedCity?.cityName]);

  return (
    <>
      <Typography
        component="h5"
        variant="h5"
        sx={(theme) => ({ color: theme.palette.app.text, marginBottom: "30px" })}
      >
        {t("forecast_twoweeks")}
      </Typography>

      {days && days.length > 0 ? (
        <Slider {...settings}>
          {days.map((item) => (
            <SingleForecast key={item.date} {...item} />
          ))}
        </Slider >
      ) : null
      }
    </>
  );
}

export default WeatherForecast;
