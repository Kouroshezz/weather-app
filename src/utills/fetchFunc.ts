import axios from "axios";

const apiInstance = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/',
  timeout: 1000,
  params: {
    APPID: import.meta.env.VITE_API_KEY,
    units: "metric",
  },
});


export const getCurrentWeather = async (city: string) => {
  try {
    const response = await apiInstance.get("/weather", {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    console.error('fetch error:', error);
    throw error;
  }
};

// export const getCurrentWeather = async (city: string) => {
//   const response = await apiInstance.get("/weather", {
//     params: { q: city },
//   });
//   return response.data;
// };
