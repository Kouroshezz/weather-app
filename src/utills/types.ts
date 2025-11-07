export type FetchCities = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

// ----------- weather type
export type currentWeatherType = {
  location: {
    name: string,
    region?: string,
    country?: string,
    lat?: number,
    lon?: number,
    tz_id?: string,
    localtime_epoch?: number,
    localtime: string
  },
  current: {
    temp_c: number,
    condition: {
      text: string,
      icon: string,
      code?: number
    },
    cloud?: number,
    feelslike_c?: number
  }
}

// ---- forecast single type
export type WeatherForecastType = {
  current: {
    temp_c: number;
    condition: { text: string; icon: string };
  };
  forecast: {
    forecastday: SingleWeatherCard[];
  };
};

export type SingleWeatherCard = {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: { text: string; icon: string };
  };
};