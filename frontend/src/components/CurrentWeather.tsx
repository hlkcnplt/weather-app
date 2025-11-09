import { useWeatherStore } from "../store/useWeatherStore";
import { Wind, Droplet } from "lucide-react";

const CurrentWeather = () => {
  const { weatherData, isWeatherLoading } = useWeatherStore();

  if (isWeatherLoading) {
    return (
      <div className='flex justify-center items-center mt-10'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    );
  }

  if (!weatherData) {
    return <div></div>;
  }

  const data = weatherData.data;

  return (
    <div className='flex flex-row justify-between items-center w-full mr-20'>
      <div>
        {" "}
        <p className='text-8xl '>{data.current.temp_c}°C</p>
        <p className='text-5xl'>{data.current.condition.text}</p>
        <div className='flex flex-row gap-10 mt-10'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-1'>
              <Wind />
              <p>Wind</p>
            </div>
            <p>{data.current.wind_kph} km/h</p>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-1'>
              <Droplet />
              <p>Humidity</p>
            </div>
            <p>{data.current.humidity} %</p>
          </div>
        </div>
      </div>
      <div>
        <img
          src={data.current.condition.icon}
          alt={data.current.condition.text}
        />
      </div>
    </div>
  );
};

export default CurrentWeather;
