import { useState } from "react";
import { Search } from "lucide-react";
import { useWeatherStore } from "../store/useWeatherStore";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const { fetchWeatherData } = useWeatherStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city.trim()) {
      return;
    }
    fetchWeatherData(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className='join'>
      <input
        type='text'
        placeholder='Search for a city'
        className='input input-bordered join-item'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type='submit' className='btn join-item'>
        <Search />
      </button>
    </form>
  );
};

export default SearchBar;
