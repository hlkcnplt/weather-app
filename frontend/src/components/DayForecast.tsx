import { useWeatherStore } from "../store/useWeatherStore";
import { CalendarDays } from "lucide-react";

const DayForecast = () => {
  const { weatherData } = useWeatherStore();

  if (!weatherData) {
    return null;
  }

  const futureDays = weatherData.data.forecast.forecastday;

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6 text-white/80">
        <CalendarDays className="w-5 h-5" />
        <h3 className="font-semibold text-lg">3-Day Forecast</h3>
      </div>

      <div className="flex flex-col gap-4">
        {futureDays.map((day: any, index: number) => (
          <div
            key={day.date}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex flex-col">
              <span className="font-medium text-lg text-white">
                {index === 0 ? "Today" : getDayName(day.date)}
              </span>
              <span className="text-sm text-gray-400">{day.date}</span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="w-10 h-10"
              />
              <div className="flex flex-col items-end min-w-[60px]">
                <span className="text-xl font-bold text-white">
                  {Math.round(day.day.avgtemp_c)}°
                </span>
                <span className="text-xs text-gray-400">Avg Temp</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayForecast;
