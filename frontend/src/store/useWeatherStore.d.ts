export interface WeatherStore {
    weatherData: any;
    isWeatherLoading: boolean;
    fetchWeatherData: (city: string) => Promise<void>;
}

export const useWeatherStore: () => WeatherStore;
