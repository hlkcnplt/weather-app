import 'dotenv/config'; 

const OPENWEATHER_KEY = process.env.OPENWEATHER_API_KEY || '';

const mapCurrent = (data) => ({
  temperature: data?.main?.temp ?? null,
  condition: data?.weather?.[0]?.main ?? 'Unknown',
  humidity: data?.main?.humidity ?? null,
  timestamp: new Date().toISOString(),
  raw: data
});

const mapForecast = (data) => {
  if (!data || !data.list) return [];
  const now = Date.now();
  const targets = [
    now - 24 * 60 * 60 * 1000,
    now + 24 * 60 * 60 * 1000,
    now + 2 * 24 * 60 * 60 * 1000
  ];
  const pickClosest = (target) => {
    let closest = data.list[0];
    let minDiff = Math.abs(new Date(closest.dt_txt).getTime() - target);
    for (const entry of data.list) {
      const t = new Date(entry.dt_txt).getTime();
      const diff = Math.abs(t - target);
      if (diff < minDiff) {
        minDiff = diff;
        closest = entry;
      }
    }
    return {
      date: new Date(target).toISOString(),
      temperature: closest.main?.temp ?? null,
      condition: closest.weather?.[0]?.main ?? 'Unknown',
      humidity: closest.main?.humidity ?? null,
      raw: closest
    };
  };
  return targets.map(pickClosest);
};

export const fetchCurrentWeather = async (city) => {
  if (!city) throw new Error('City is required');
  if (OPENWEATHER_KEY) {
    try {
      const q = encodeURIComponent(city);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${OPENWEATHER_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`OpenWeather error: ${res.status}`);
      const data = await res.json();
      return mapCurrent(data);
    } catch (err) {
      console.warn('Weather service fetch failed:', err?.message || err);
    }
  }
  return mapCurrent({
    main: { temp: Math.floor(Math.random() * 15) + 10, humidity: Math.floor(Math.random() * 50) + 30 },
    weather: [{ main: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)] }]
  });
};

export const fetchForecast = async (city) => {
  if (!city) throw new Error('City is required');
  if (OPENWEATHER_KEY) {
    try {
      const q = encodeURIComponent(city);
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&units=metric&appid=${OPENWEATHER_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`OpenWeather forecast error: ${res.status}`);
      const data = await res.json();
      return mapForecast(data);
    } catch (err) {
      console.warn('Forecast fetch failed:', err?.message || err);
    }
  }
  const now = Date.now();
  return [-1, 1, 2].map((d) => ({
    date: new Date(now + d * 24 * 60 * 60 * 1000).toISOString(),
    temperature: Math.floor(Math.random() * 15) + 10,
    condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 50) + 30
  }));
};