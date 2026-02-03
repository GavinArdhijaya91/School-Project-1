import express from 'express';
import { body, validationResult } from 'express-validator';
import data, { getNextId } from '../models/data.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        const articles = data.articles.sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        res.json({
            success: true,
            data: articles
        });
    } catch (error) {
        console.error('Get articles error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
});

router.get('/:id', (req, res) => {
    try {
        const article = data.articles.find(a => a.id === parseInt(req.params.id));

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Artikel tidak ditemukan'
            });
        }

        res.json({
            success: true,
            data: article
        });
    } catch (error) {
        console.error('Get article error:', error);
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
        body('category').notEmpty().withMessage('Kategori harus diisi'),
        body('excerpt').notEmpty().withMessage('Excerpt harus diisi'),
        body('content').notEmpty().withMessage('Konten harus diisi'),
        body('author').notEmpty().withMessage('Penulis harus diisi')
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

            const { title, date, category, excerpt, author, image, content } = req.body;

            const newArticle = {
                id: getNextId(data.articles),
                title,
                date: date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
                category,
                excerpt,
                author,
                image: image || '',
                content,
                createdAt: new Date()
            };

            data.articles.push(newArticle);

            res.status(201).json({
                success: true,
                message: 'Artikel berhasil ditambahkan',
                data: newArticle
            });
        } catch (error) {
            console.error('Create article error:', error);
            res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan server'
            });
        }
    }
);

router.put('/:id',
    authMiddleware,
    [
        body('title').optional().notEmpty().withMessage('Judul tidak boleh kosong'),
        body('category').optional().notEmpty().withMessage('Kategori tidak boleh kosong'),
        body('excerpt').optional().notEmpty().withMessage('Excerpt tidak boleh kosong'),
        body('content').optional().notEmpty().withMessage('Konten tidak boleh kosong')
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

            const articleIndex = data.articles.findIndex(a => a.id === parseInt(req.params.id));

            if (articleIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: 'Artikel tidak ditemukan'
                });
            }

            data.articles[articleIndex] = {
                ...data.articles[articleIndex],
                ...req.body,
                id: data.articles[articleIndex].id,
                createdAt: data.articles[articleIndex].createdAt,
                updatedAt: new Date()
            };

            res.json({
                success: true,
                message: 'Artikel berhasil diupdate',
                data: data.articles[articleIndex]
            });
        } catch (error) {
            console.error('Update article error:', error);
            res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan server'
            });
        }
    }
);

router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const articleIndex = data.articles.findIndex(a => a.id === parseInt(req.params.id));

        if (articleIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Artikel tidak ditemukan'
            });
        }

        const deletedArticle = data.articles.splice(articleIndex, 1)[0];

        res.json({
            success: true,
            message: 'Artikel berhasil dihapus',
            data: deletedArticle
        });
    } catch (error) {
        console.error('Delete article error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
});

export default router;
