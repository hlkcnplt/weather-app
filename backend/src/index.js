import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import redisClient from './config/redis.js';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;

redisClient.connect().then(() => {
  console.log('Redis connected');
}).catch(() => {
  console.warn('Redis unavailable, continuing without caching');
});

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ redis: redisClient?.isReady ? 'connected' : 'disconnected' });
});

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});