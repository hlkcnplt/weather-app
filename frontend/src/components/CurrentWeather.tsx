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

      {/* Top Section: Temp & Condition */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            {Math.round(data.current.temp_c)}°
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-blue-200 mt-2">
            {data.current.condition.text}
          </p>
        </div>

        <img
          className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-2xl"
          src={data.current.condition.icon.replace("64x64", "128x128")}
          alt={data.current.condition.text}
        />
      </div>

      {/* Bottom Section: Details */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Wind Speed</p>
            <p className="text-xl font-semibold">{data.current.wind_kph} <span className="text-sm font-normal text-gray-400">km/h</span></p>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Humidity</p>
            <p className="text-xl font-semibold">{data.current.humidity}<span className="text-sm font-normal text-gray-400">%</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
