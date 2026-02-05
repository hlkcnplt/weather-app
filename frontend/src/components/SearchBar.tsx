import { useState } from "react";
import { Search, MapPin, LocateFixed } from "lucide-react";
import { useWeatherStore } from "../store/useWeatherStore";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const { weatherData, fetchWeatherData } = useWeatherStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city.trim()) {
      return;
    }
    fetchWeatherData(city);
    setCity("");
  };

  const position = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=3&accept-language=en`,
            );
            const data = await response.json();

            let add = data.address;

            let finalcityname = "";

            if (add.province) {
              finalcityname = add.province;
            } else if (add.country) {
              finalcityname = add.country;
            }

            if (finalcityname) {
              fetchWeatherData(finalcityname);
              setCity(finalcityname);
            } else {
              console.warn(
                "could not determine city name from coordinates. falling back to coordinate-based fetch.",
              );
            }
          } catch (error) {
            console.error(
              "Error during reverse geocoding or fetching weather: ",
              error,
            );
          }
        },
        (err) => {
          console.error("Error getting location: ", err);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const location = weatherData?.data.location;

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
      <form onSubmit={handleSubmit} className="relative w-full md:w-96 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors" />
        <input
          type="text"
          placeholder="Search for a city..."
          className="w-full bg-black/20 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:bg-black/30 focus:border-white/30 transition-all"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </form>

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        <div className="flex items-center gap-2 text-white/90">
          <MapPin className="w-5 h-5 text-blue-400" />
          <span className="font-medium text-lg truncate max-w-[200px]">
            {weatherData
              ? `${location.name}, ${location.country}`
              : "Select location"}
          </span>
        </div>

        <button
          onClick={position}
          className="p-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-full transition-colors"
          title="Use my location"
        >
          <LocateFixed className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
