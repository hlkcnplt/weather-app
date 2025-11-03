import { Router } from 'express';
import { getCurrentWeather, getWeatherForecast } from '../controllers/weatherController.js';

const router = Router();

router.get('/weather/forecast/:city', getWeatherForecast);

router.get('/weather/:city', getCurrentWeather);

export default router;