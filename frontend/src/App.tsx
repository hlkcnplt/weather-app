import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DayForecast from "./components/DayForecast";
import HourForecast from "./components/HourForecast";

const App = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10 flex flex-col gap-8">
        {/* Header Section */}
        <div className="w-full">
          <SearchBar />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          {/* Top Row: Current Weather (2/3) & 3-Day Forecast (1/3) */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex-1 min-h-[250px] bg-black/20 rounded-2xl p-4 md:p-6 border border-white/5">
              <CurrentWeather />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-black/20 rounded-2xl p-4 md:p-6 border border-white/5 h-full">
              <DayForecast />
            </div>
          </div>

          {/* Bottom Row: Hourly Forecast (Full Width) */}
          <div className="lg:col-span-3 w-full">
            <div className="bg-black/20 rounded-2xl p-4 md:p-6 border border-white/5 overflow-hidden">
              <HourForecast />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
