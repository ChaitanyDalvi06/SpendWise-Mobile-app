const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const expenseRoutes = require('./routes/expenses');
const authRoutes    = require('./routes/auth');

const app  = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/expenses', expenseRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'SpendWise API' }));

// ── Start ─────────────────────────────────────────────────────────────────────
// No manual DB setup needed — tables and functions are created in the
// Supabase SQL Editor using schema.sql before running this server.
app.listen(PORT, () => {
  console.log(`🚀 SpendWise API running → http://localhost:${PORT}`);
  console.log(`   Auth:     http://localhost:${PORT}/api/auth`);
  console.log(`   Expenses: http://localhost:${PORT}/api/expenses`);
  console.log('✅ Connected to Supabase (PostgreSQL)');
});
