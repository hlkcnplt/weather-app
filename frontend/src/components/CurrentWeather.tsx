import { useWeatherStore } from "../store/useWeatherStore";
import { Wind, Droplet, ThermometerSun } from "lucide-react";

const CurrentWeather = () => {
  const { weatherData, isWeatherLoading } = useWeatherStore();

  if (isWeatherLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-white"></span>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-white/50">
        <ThermometerSun className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-xl">No weather data available</p>
      </div>
    );
  }

  const data = weatherData.data;

  return (
    <div className="relative h-full flex flex-col justify-between z-10">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            {Math.round(data.current.temp_c)}°
          </h1>
          <p className="text-xl md:text-2xl font-medium text-blue-200 mt-1">
            {data.current.condition.text}
          </p>
        </div>

        <img
          className="w-24 h-24 md:w-40 md:h-40 object-contain drop-shadow-2xl"
          src={data.current.condition.icon.replace("64x64", "128x128")}
          alt={data.current.condition.text}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="p-2 bg-blue-500/20 rounded-full text-blue-400">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Wind Speed</p>
            <p className="text-lg font-semibold">
              {data.current.wind_kph}{" "}
              <span className="text-xs font-normal text-gray-400">km/h</span>
            </p>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="p-2 bg-blue-500/20 rounded-full text-blue-400">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Humidity</p>
            <p className="text-lg font-semibold">
              {data.current.humidity}
              <span className="text-xs font-normal text-gray-400">%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
