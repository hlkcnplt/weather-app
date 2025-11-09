import { useWeatherStore } from "../store/useWeatherStore";

const HourForecast = () => {
  const { weatherData } = useWeatherStore();

  if (!weatherData) {
    return <div></div>;
  }

  const todayForecast = weatherData.data.forecast.forecastday[0].hour;

  return (
    <div className='max-w-7xl mx-auto'>
      <div
        className='flex flex-row overflow-x-scroll gap-4 py-2'
        style={{ scrollbarWidth: "none" }} // For Firefox
      >
        {todayForecast.map((hour) => (
          <div
            key={hour.time}
            className='flex flex-col items-center justify-center 
                       bg-base-100 rounded-lg p-3 min-w-[80px] shadow-md hover:bg-base-200 transition-colors'
          >
            <p className='font-bold text-lg'>{hour.time.split(" ")[1]}</p>

            <img
              src={hour.condition.icon}
              alt={hour.condition.text}
              className='w-10 h-10 my-1'
            />
            <p className='text-xl text-primary'>{hour.temp_c}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourForecast;
