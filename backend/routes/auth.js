import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import data from '../models/data.js';
import rateLimiter, { recordFailedAttempt, clearAttempts } from '../middleware/rateLimiter.js';
import authMiddleware from '../middleware/auth.js';

dotenv.config();

const router = express.Router();

router.post('/login',
    rateLimiter,
    [
        body('email').isEmail().withMessage('Email tidak valid'),
        body('password').notEmpty().withMessage('Password harus diisi')
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Data tidak valid',
                    errors: errors.array()
                });
            }

            const { email, password } = req.body;

            const user = data.users.find(u => u.email === email);

            if (!user) {
                const attemptResult = recordFailedAttempt(email);

                if (attemptResult.locked) {
                    return res.status(429).json({
                        success: false,
                        message: `Terlalu banyak percobaan login gagal. Coba lagi dalam ${attemptResult.remainingSeconds} detik.`,
                        lockedUntil: attemptResult.until,
                        remainingSeconds: attemptResult.remainingSeconds
                    });
                }

                return res.status(401).json({
                    success: false,
                    message: 'Email atau password salah',
                    attemptsRemaining: attemptResult.attemptsRemaining
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                const attemptResult = recordFailedAttempt(email);

                if (attemptResult.locked) {
                    return res.status(429).json({
                        success: false,
                        message: `Terlalu banyak percobaan login gagal. Coba lagi dalam ${attemptResult.remainingSeconds} detik.`,
                        lockedUntil: attemptResult.until,
                        remainingSeconds: attemptResult.remainingSeconds
                    });
                }

                return res.status(401).json({
                    success: false,
                    message: 'Email atau password salah',
                    attemptsRemaining: attemptResult.attemptsRemaining
                });
            }

            clearAttempts(email);

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                success: true,
                message: 'Login berhasil',
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan server'
            });
        }
    }
);

router.get('/verify', authMiddleware, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

router.post('/change-password',
    authMiddleware,
    [
        body('currentPassword').notEmpty().withMessage('Password lama harus diisi'),
        body('newPassword').isLength({ min: 6 }).withMessage('Password baru minimal 6 karakter')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Data tidak valid',
                    errors: errors.array()
                });
            }

            const { currentPassword, newPassword } = req.body;
            const user = data.users.find(u => u.id === req.user.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User tidak ditemukan'
                });
            }

            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Password lama tidak sesuai'
                });
            }

            user.password = await bcrypt.hash(newPassword, 10);

            res.json({
                success: true,
                message: 'Password berhasil diubah'
            });
        } catch (error) {
            console.error('Change password error:', error);
            res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan server'
            });
        }
    }
);

router.post('/logout', authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: 'Logout berhasil'
    });
});

export default router;
