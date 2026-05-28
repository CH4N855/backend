import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/mongodb.js';
import { seedIfEmpty } from './lib/seed.js';
import authRoutes    from './routes/auth.js';
import uploadRoutes  from './routes/upload.js';
import contentRoutes from './routes/content.js';

const app  = express();
const PORT = process.env.PORT || 4000;

// ── CORS ──────────────────────────────────────────────────────────────────
// In production: only allow your Vercel frontend URL
// In dev: allow localhost:5173
const allowedOrigins = [
  process.env.FRONTEND_URL,          // e.g. https://my-portfolio.vercel.app
  'http://localhost:5173',           // local Vite dev server
  'http://localhost:4173',           // local Vite preview
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

// ── Body parsing ──────────────────────────────────────────────────────────
// Note: /api/upload uses raw stream (Busboy), so we skip bodyParser for it
app.use((req, res, next) => {
  if (req.path === '/api/upload') return next();
  express.json({ limit: '2mb' })(req, res, next);
});

// ── Health check ──────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// ── API routes ────────────────────────────────────────────────────────────
app.use('/api/auth',   authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api',        contentRoutes);

// ── 404 fallback ──────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: `Route ${req.method} ${req.path} not found` }));

// ── Global error handler ──────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────────────────
async function start() {
  try {
    await connectDB();
    await seedIfEmpty();
    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
      console.log(`   CORS allowed: ${allowedOrigins.join(', ')}`);
    });
  } catch (err) {
    console.error('❌ Failed to start:', err.message);
    process.exit(1);
  }
}

start();
