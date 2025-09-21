import axios from "axios";


export function fetchIcon(iconCode: number | undefined) {
  if (iconCode === undefined || iconCode === null) {
    return '';
  }
  return `https://www.accuweather.com/assets/images/weather-icons/v2a/${iconCode}.svg`
}

const apiInstance = axios.create({
  // baseURL: 'http://api.openweathermap.org/data/2.5/',
  baseURL: 'https://dataservice.accuweather.com',
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCU_WEATHER_KEY}`,
    "Content-Type": "application/json",
  }
  // params: {
  //   APPID: import.meta.env.VITE_API_KEY,
  //   units: "metric",
  // },
});


export const getCurrentWeather = async (city: string | number | undefined) => {
  try {
    const response = await apiInstance.get(`/currentconditions/v1/${city}`);
    return response.data;
  } catch (error) {
    console.error('fetch error:', error);
    throw error;
  }
};

// --- historical chart for past 24 hours - API is limited to past 24 hours not monthly as UI

export const getHistorical = async (cityCode: number | undefined) => {
  try {
    const response = await apiInstance.get(`/currentconditions/v1/${cityCode}/historical/24`);
    return response.data;
  } catch (error) {
    console.error('fetch error:', error);
    throw error;
  }
}


// --- fetch function for auto complete cities name

export const getCities = async (query: string) => {
  try {
    const response = await apiInstance.get("/locations/v1/autocomplete", {
      params: { q: query },
    });
    return response;
  } catch (error) {
    console.error('error:', error);
    throw error;
  }
}
