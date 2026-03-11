const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const expenseRoutes = require('./routes/expenses');
const authRoutes    = require('./routes/auth');

const app  = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// ── Middleware ────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:5000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin '${origin}' not allowed`));
  },
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/expenses', expenseRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'SpendWise API' }));

// ── Start ─────────────────────────────────────────────────────────────────────
// No manual DB setup needed — tables and functions are created in the
// Supabase SQL Editor using schema.sql before running this server.
//
// For local development: node server.js → starts HTTP listener.
// For Vercel: module.exports = app → Vercel wraps it as a serverless function.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 SpendWise API running → http://localhost:${PORT}`);
    console.log(`   Auth:     http://localhost:${PORT}/api/auth`);
    console.log(`   Expenses: http://localhost:${PORT}/api/expenses`);
    console.log('✅ Connected to Supabase (PostgreSQL)');
  });
}

module.exports = app;
