import express from 'express';
import { body, validationResult } from 'express-validator';
import data, { getNextId } from '../models/data.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            data: data.staff
        });
    } catch (error) {
        console.error('Get staff error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
});

router.post('/',
    authMiddleware,
    [
        body('name').notEmpty().withMessage('Nama harus diisi'),
        body('role').notEmpty().withMessage('Jabatan harus diisi')
    ],
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Data tidak valid',
                    errors: errors.array()
                });
            }

            const { name, role, image } = req.body;

            const newStaff = {
                id: getNextId(data.staff),
                name,
                role,
                image: image || '',
                createdAt: new Date()
            };

            data.staff.push(newStaff);

            res.status(201).json({
                success: true,
                message: 'Staff berhasil ditambahkan',
                data: newStaff
            });
        } catch (error) {
            console.error('Create staff error:', error);
            res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan server'
            });
        }
    }
);

router.put('/:id', authMiddleware, (req, res) => {
    try {
        const staffIndex = data.staff.findIndex(s => s.id === parseInt(req.params.id));

        if (staffIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Staff tidak ditemukan'
            });
        }

        data.staff[staffIndex] = {
            ...data.staff[staffIndex],
            ...req.body,
            id: data.staff[staffIndex].id,
            createdAt: data.staff[staffIndex].createdAt,
            updatedAt: new Date()
        };

        res.json({
            success: true,
            message: 'Staff berhasil diperbarui',
            data: data.staff[staffIndex]
        });
    } catch (error) {
        console.error('Update staff error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
});

router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const staffIndex = data.staff.findIndex(s => s.id === parseInt(req.params.id));

        if (staffIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Staff tidak ditemukan'
            });
        }

        const deletedStaff = data.staff.splice(staffIndex, 1)[0];

        res.json({
            success: true,
            message: 'Staff berhasil dihapus',
            data: deletedStaff
        });
    } catch (error) {
        console.error('Delete staff error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
});

export default router;
