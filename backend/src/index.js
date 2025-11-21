import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import redisClient from "./config/redis.js";
import apiRoutes from "./routes/api.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
