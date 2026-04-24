const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');
require('dotenv').config();

const authRoutes         = require('./routes/auth');
const hospitalAuthRoutes = require('./routes/hospitalAuth');
const adminRoutes        = require('./routes/admin');
const donationRoutes     = require('./routes/donations');
const orderRoutes        = require('./routes/order');
const aiRoutes           = require('./routes/ai');

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
// Reads both casings: Frontend_URL (as set in Render) and FRONTEND_URL
const FRONTEND_URL = process.env.FRONTEND_URL || process.env.Frontend_URL || '';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://medicare-frontend-qlam.onrender.com', // exact Render frontend URL
  FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // Postman / curl / admin panel same-domain
    const isRender = origin.endsWith('.onrender.com');
    if (allowedOrigins.includes(origin) || isRender) return cb(null, true);
    console.warn(`CORS blocked: ${origin}`);
    cb(new Error(`CORS: ${origin} not allowed`));
  },
  credentials: true,
  methods:        ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests for all routes
app.options('*', cors());

app.use(express.json());

// ── Admin Panel ───────────────────────────────────────────────────────────────
app.use('/admin', express.static(path.join(__dirname, 'public')));
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-panel.html'));
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth',          authRoutes);
app.use('/api/auth/hospital', hospitalAuthRoutes);
app.use('/api/admin',         adminRoutes);
app.use('/api/donations',     donationRoutes);
app.use('/api/order',         orderRoutes);
app.use('/api/ai',            aiRoutes);

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host     = req.headers.host;
  res.json({
    status:      'ok',
    db:          mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    adminPanel:  `${protocol}://${host}/admin`,
    env:         process.env.NODE_ENV || 'development',
    frontendUrl: FRONTEND_URL || 'not set',
  });
});

// ── MongoDB ───────────────────────────────────────────────────────────────────
const connectDB = async () => {
  const uri = (process.env.atlas_URI || '').trim();
  if (!uri) { console.error('❌  atlas_URI not set in .env'); process.exit(1); }
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS:          45000,
    });
    console.log('✅  Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌  MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => console.warn('⚠️  MongoDB disconnected…'));
mongoose.connection.on('reconnected',  () => console.log('✅  MongoDB reconnected'));
mongoose.connection.on('error', err   => console.error('❌  MongoDB error:', err.message));

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀  Server on port ${PORT}`);
    console.log(`🖥️   Admin → http://localhost:${PORT}/admin`);
    console.log(`🌐  Frontend URL → ${FRONTEND_URL || 'not set (*.onrender.com wildcard active)'}`);
  });
});
