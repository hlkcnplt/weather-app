import { useWeatherStore } from "../store/useWeatherStore";

const DayForecast = () => {
  const { weatherData } = useWeatherStore();

  if (!weatherData) {
    return <div className=' mt-10'></div>;
  }

  const futureDays = weatherData.data.forecast.forecastday;

  return (
    <div>
      {futureDays.map((day) => (
        <div
          key={day.date}
          className='flex flex-row justify-between items-center bg-base-100 rounded-lg my-2'
        >
          <img
            src={day.day.condition.icon}
            alt={day.day.condition.text}
            className='w-10 h-10 my-1'
          />
          <div className='flex flex-col gap-0.5'>
            <p>{day.date}</p>
            <p>{day.day.condition.text}</p>
          </div>
          <p>{day.day.avgtemp_c}°C</p>
        </div>
      ))}
    </div>
  );
};

export default DayForecast;
