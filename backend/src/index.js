import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import redisClient from "./config/redis.js";
import apiRoutes from "./routes/api.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

redisClient
  .connect()
  .then(() => {
    console.log("Redis connected");
  })
  .catch(() => {
    console.warn("Redis unavailable, continuing without caching");
  });

app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({ redis: redisClient?.isReady ? "connected" : "disconnected" });
});

app.use("/api", apiRoutes);

console.log("Current NODE_ENV:", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  console.log("Serving static files from:", frontendPath);

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  console.log("Running in development mode (or NODE_ENV not set to production)");
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
