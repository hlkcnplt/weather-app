import { useWeatherStore } from "../store/useWeatherStore";
import { Clock } from "lucide-react";

const HourForecast = () => {
  const { weatherData } = useWeatherStore();

  if (!weatherData) {
    return null;
  }

  const todayForecast = weatherData.data.forecast.forecastday[0].hour;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 text-white/80">
        <Clock className="w-5 h-5" />
        <h3 className="font-semibold text-lg">Hourly Forecast</h3>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <div className="flex gap-4 min-w-min">
          {todayForecast.map((hour: any) => (
            <div
              key={hour.time}
              className="flex flex-col items-center justify-between min-w-[100px] p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 group"
            >
              <p className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                {hour.time.split(" ")[1]}
              </p>

              <img
                src={hour.condition.icon}
                alt={hour.condition.text}
                className="w-12 h-12 my-2 drop-shadow-lg"
              />

              <p className="text-xl font-bold text-white">
                {Math.round(hour.temp_c)}°
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourForecast;
