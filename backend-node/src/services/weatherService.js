import "dotenv/config";
import axios from "axios";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "";

export const fetchWeather = async (city) => {
  if (!city) throw new Error("City is required");
  if (WEATHER_API_KEY) {
    try {
      const q = encodeURIComponent(city);
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${q}&days=3&aqi=no&alerts=no`;
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.warn(
          `Weather service API error: ${err.response.status} ${err.response.statusText}`,
          err.response.data
        );
      } else {
        console.warn("Weather service fetch failed:", err?.message || err);
      }
      return null;
    }
  }
  console.warn("WEATHERAPI_API_KEY not set or found in environment variables.");
  return null;
};
