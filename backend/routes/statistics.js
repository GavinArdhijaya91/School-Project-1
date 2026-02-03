import express from 'express';
import data from '../models/data.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            data: data.statistics
        });
    } catch (error) {
        console.error('Get statistics error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
});

router.put('/', authMiddleware, (req, res) => {
    try {
        const { students, teachers, support } = req.body;

        if (students !== undefined) data.statistics.students = parseInt(students);
        if (teachers !== undefined) data.statistics.teachers = parseInt(teachers);
        if (support !== undefined) data.statistics.support = parseInt(support);

        data.statistics.lastUpdated = new Date();

        res.json({
            success: true,
            message: 'Statistik berhasil diperbarui',
            data: data.statistics
        });
    } catch (error) {
        console.error('Update statistics error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
});

export default router;
