import express from 'express';
import { body, validationResult } from 'express-validator';
import data, { getNextId } from '../models/data.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            data: data.gallery
        });
    } catch (error) {
        console.error('Get gallery error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
});

router.post('/',
    authMiddleware,
    [
        body('src').notEmpty().withMessage('URL gambar harus diisi'),
        body('title').notEmpty().withMessage('Judul harus diisi')
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

            const { src, alt, title, description } = req.body;

            const newImage = {
                id: getNextId(data.gallery),
                src,
                alt: alt || title,
                title,
                description: description || '',
                createdAt: new Date()
            };

            data.gallery.push(newImage);

            res.status(201).json({
                success: true,
                message: 'Gambar berhasil ditambahkan',
                data: newImage
            });
        } catch (error) {
            console.error('Create gallery error:', error);
            res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan server'
            });
        }
    }
);

router.put('/:id', authMiddleware, (req, res) => {
    try {
        const imageIndex = data.gallery.findIndex(g => g.id === parseInt(req.params.id));

        if (imageIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Gambar tidak ditemukan'
            });
        }

        data.gallery[imageIndex] = {
            ...data.gallery[imageIndex],
            ...req.body,
            id: data.gallery[imageIndex].id,
            createdAt: data.gallery[imageIndex].createdAt,
            updatedAt: new Date()
        };

        res.json({
            success: true,
            message: 'Gambar berhasil diperbarui',
            data: data.gallery[imageIndex]
        });
    } catch (error) {
        console.error('Update gallery error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
});

router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const imageIndex = data.gallery.findIndex(g => g.id === parseInt(req.params.id));

        if (imageIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Gambar tidak ditemukan'
            });
        }

        const deletedImage = data.gallery.splice(imageIndex, 1)[0];

        res.json({
            success: true,
            message: 'Gambar berhasil dihapus',
            data: deletedImage
        });
    } catch (error) {
        console.error('Delete gallery error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
});

export default router;
