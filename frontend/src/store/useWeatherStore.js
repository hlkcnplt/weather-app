import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useWeatherStore = create((set) => ({
  weatherData: null,
  isWeatherLoading: false,

  fetchWeatherData: async (city) => {
    set({ isWeatherLoading: true });
    try {
      const response = await axiosInstance.get(`/${city}`);
      set({ weatherData: response.data });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      set({ isWeatherLoading: false });
    }
  },
}));
