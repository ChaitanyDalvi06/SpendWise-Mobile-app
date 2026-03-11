const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const expenseRoutes = require('./routes/expenses');
const authRoutes    = require('./routes/auth');

const app  = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// ── Middleware ────────────────────────────────────────────────────────────────
// Allow all localhost origins (any port) for local development.
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl) or any localhost origin
    if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS: origin '${origin}' not allowed`));
  },
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/expenses', expenseRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'SpendWise API' }));

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 SpendWise API running → http://localhost:${PORT}`);
  console.log(`   Auth:     http://localhost:${PORT}/api/auth`);
  console.log(`   Expenses: http://localhost:${PORT}/api/expenses`);
  console.log('✅ Connected to Supabase (PostgreSQL)');
});
