import express from 'express';
import { body, validationResult } from 'express-validator';
import data, { getNextId } from '../models/data.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            data: {
                academic: data.programs.academic,
                extracurricular: data.programs.extracurricular
            }
        });
    } catch (error) {
        console.error('Get programs error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
});

router.post('/',
    authMiddleware,
    [
        body('title').notEmpty().withMessage('Judul harus diisi'),
        body('type').isIn(['akademik', 'ekstrakurikuler']).withMessage('Tipe harus akademik atau ekstrakurikuler')
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

            const { title, description, type, icon } = req.body;

            const allPrograms = [...data.programs.academic, ...data.programs.extracurricular];

            const newProgram = {
                id: getNextId(allPrograms),
                title,
                description: description || '',
                type,
                icon: icon || '',
                createdAt: new Date()
            };

            if (type === 'akademik') {
                data.programs.academic.push(newProgram);
            } else {
                data.programs.extracurricular.push(newProgram);
            }

            res.status(201).json({
                success: true,
                message: 'Program berhasil ditambahkan',
                data: newProgram
            });
        } catch (error) {
            console.error('Create program error:', error);
            res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan server'
            });
        }
    }
);

router.put('/:id', authMiddleware, (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let programIndex = data.programs.academic.findIndex(p => p.id === id);
        let type = 'akademik';

        if (programIndex === -1) {
            programIndex = data.programs.extracurricular.findIndex(p => p.id === id);
            type = 'ekstrakurikuler';
        }

        if (programIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Program tidak ditemukan'
            });
        }

        const programArray = type === 'akademik' ? data.programs.academic : data.programs.extracurricular;

        programArray[programIndex] = {
            ...programArray[programIndex],
            ...req.body,
            id: programArray[programIndex].id,
            type: programArray[programIndex].type,
            createdAt: programArray[programIndex].createdAt,
            updatedAt: new Date()
        };

        res.json({
            success: true,
            message: 'Program berhasil diperbarui',
            data: programArray[programIndex]
        });
    } catch (error) {
        console.error('Update program error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
});

router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let programIndex = data.programs.academic.findIndex(p => p.id === id);
        let type = 'akademik';

        if (programIndex === -1) {
            programIndex = data.programs.extracurricular.findIndex(p => p.id === id);
            type = 'ekstrakurikuler';
        }

        if (programIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Program tidak ditemukan'
            });
        }

        const programArray = type === 'akademik' ? data.programs.academic : data.programs.extracurricular;
        const deletedProgram = programArray.splice(programIndex, 1)[0];

        res.json({
            success: true,
            message: 'Program berhasil dihapus',
            data: deletedProgram
        });
    } catch (error) {
        console.error('Delete program error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
});

export default router;
