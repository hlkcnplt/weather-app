import { Router } from "express";
import { getWeather } from "../controllers/weatherController.js";

const router = Router();

router.get("/weather/:city", getWeather);

export default router;
