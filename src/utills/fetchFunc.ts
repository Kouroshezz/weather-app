import axios from "axios";
import type { currentWeatherType } from "./types";

const apiInstance = axios.create({
  baseURL: 'http://api.weatherapi.com/v1',
  timeout: 3000,
  params: {
    key: import.meta.env.VITE_WEATHER_API
  }
});


export const getCurrentWeather = async (city: string): Promise<currentWeatherType> => {
  try {
    const response = await apiInstance.get(`/current.json`, {
      params: {
        language: 'en',
        q: city
      },
    });
    return response.data;
  } catch (error) {
    console.error('fetch error:', error);
    throw error;
  }
};

//--- fetch 14 days weather

export const getWeatherForecast = async (city: string) => {
  try {
    const response = await apiInstance.get(`/forecast.json`, {
      params: {
        q: city,
        days: 14,
        aqi: 'no',
        alerts: 'no'
      },
    });
    return response.data;
  } catch (error) {
    console.error('fetch error:', error);
    throw error;
  }
};

// --- fetch function for autocomplete cities name

export const getCities = async (query: string) => {
  try {
    const response = await apiInstance.get("/search.json", {
      params: { q: query },
    });
    return response;
  } catch (error) {
    console.error('error:', error);
    throw error;
  }
}