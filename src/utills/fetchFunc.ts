import axios from "axios";


const apiInstance = axios.create({
  baseURL: 'https://dataservice.accuweather.com',
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCU_WEATHER_KEY}`,
    "Content-Type": "application/json",
  }
});


export const getCurrentWeather = async (city: string | number | undefined, lang: string = 'en-us') => {
  try {
    const response = await apiInstance.get(`/currentconditions/v1/${city}`, {
      params: {
        language: lang,
      },
    });
    return response.data;
  } catch (error) {
    console.error('fetch error:', error);
    throw error;
  }
};


// ---- next 5 day weather forecast 
export const weatherForecast = async (city: string | number | undefined, lang: string = 'en-us') => {
  try {
    const response = await apiInstance.get(`/forecasts/v1/daily/5day/${city}`, {
      params: {
        language: lang,
        metric: true
      },
    });
    return response.data;
  } catch (error) {
    console.error('fetch error:', error);
    throw error;
  }
};


// --- historical chart for past 24 hours - API is limited to past 24 hours not monthly as UI

// export const getHistorical = async (cityCode: number | undefined) => {
//   try {
//     const response = await apiInstance.get(`/currentconditions/v1/${cityCode}/historical/24`);
//     return response.data;
//   } catch (error) {
//     console.error('fetch error:', error);
//     throw error;
//   }
// }


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

// ------- fetch Icons
export function fetchIcon(iconCode: number | undefined) {
  if (iconCode === undefined || iconCode === null) {
    return '';
  }
  return `https://www.accuweather.com/assets/images/weather-icons/v2a/${iconCode}.svg`
}