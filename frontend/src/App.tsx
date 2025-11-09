import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DayForecast from "./components/DayForecast";
import HourForecast from "./components/HourForecast";

const App = () => {
  return (
    <div className='h-screen mx-10 flex flex-col items-center justify-center'>
      <div className='h-full w-full m-10 bg-base-300 rounded-xl flex flex-col justify-between items-center p-20 gap-10'>
        <SearchBar />
        <div className='w-full flex flex-row justify-between items-center'>
          <CurrentWeather />
          <DayForecast />
        </div>
        <HourForecast />
      </div>
    </div>
  );
};

export default App;
