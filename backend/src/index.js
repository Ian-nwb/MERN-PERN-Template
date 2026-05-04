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

// ====================== SERVER INITIALIZATION ======================
app.listen(port, async () => {
  console.log('--------------------------------------------------');
  console.log(`Express Server : Running on http://localhost:${port}`);

  console.log(`Database    : Available at http://localhost:5050`);
  console.log('--------------------------------------------------');
});

export { pool };