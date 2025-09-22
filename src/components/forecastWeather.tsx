import { useContext, useEffect, useState } from "react";
import { CityContext } from "../context/cityContext";
import { weatherForecast } from "../utills/fetchFunc";
import type { ForecastType } from "../utills/types";
import i18next from "i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SingleForecast from "./singleForecast";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

var settings = {
  infinite: true,
  dot: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 2,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 10,
        slidesToScroll: 3,
        infinite: true,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2
      }
    }
  ]
};

function WeatherForecast() {

  const { selectedCity } = useContext(CityContext);
  const [weather, setWeather] = useState<ForecastType[]>();
  const language = i18next.language;
  const { t } = useTranslation()

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await weatherForecast(selectedCity!.key, language);
        const duplicateArr = [...data.DailyForecasts, ...data.DailyForecasts];
        setWeather(duplicateArr);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    if (selectedCity?.key) {
      fetchWeather();
    }

  }, [selectedCity?.key]);


  return (
    <>
      <Typography component={'h5'} variant={'h5'} sx={(theme) => ({
        color: theme.palette.app.text,
        marginBottom: '30px'
      })}>
        {t('forecast_twoweeks')}
      </Typography>
      <Slider {...settings}>
        {weather && weather.map((item: ForecastType, index: number) => {
          return (
            <SingleForecast key={index} {...item} />
          )
        }
        )}
      </Slider >
    </>
  )
}

export default WeatherForecast