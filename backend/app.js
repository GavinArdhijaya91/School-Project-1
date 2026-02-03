import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import articlesRoutes from './routes/articles.js';
import staffRoutes from './routes/staff.js';
import programsRoutes from './routes/programs.js';
import galleryRoutes from './routes/gallery.js';
import statisticsRoutes from './routes/statistics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/programs', programsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/statistics', statisticsRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'SMA Negeri 1 Jelita API Server',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            articles: '/api/articles',
            staff: '/api/staff',
            programs: '/api/programs',
            gallery: '/api/gallery',
            statistics: '/api/statistics'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation available at http://localhost:${PORT}`);
});
