import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import pg from 'pg';

import routes from './routes/index.js';

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 8080;

// ====================== DATABASE CONFIG ======================
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// ====================== MIDDLEWARE ======================
app.use(express.json());
app.use(cookieParser());

// ====================== ROUTES ======================
app.use('/api', routes);

// ====================== HEALTH CHECK ENDPOINT ======================
app.get('/health', async (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    services: {
      server: 'UP',
      database: 'DOWN',
    },
  };

  try {
    // Run a lightweight query to test the actual DB connection
    await pool.query('SELECT 1');
    healthCheck.services.database = 'UP';
    
    // Everything is healthy
    res.status(200).json(healthCheck);
  } catch (error) {
    healthCheck.message = error.message;
    healthCheck.services.database = 'DOWN';
    
    // Return a 503 Service Unavailable if the database connection fails
    res.status(503).json(healthCheck);
  }
});

// ====================== SERVER INITIALIZATION ======================
app.listen(port, async () => {
  console.log('--------------------------------------------------');
  console.log(`Express Server : Running on http://localhost:${port}`);
  console.log(`Health Check   : Available at http://localhost:${port}/health`);
  console.log(`Database       : Configuration loaded for ${process.env.DB_NAME}`);
  console.log('--------------------------------------------------');
});

export { pool };