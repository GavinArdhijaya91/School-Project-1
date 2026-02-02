import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const ArticleModal = ({ article, isOpen, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') handleClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
            setIsClosing(false);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 250);
    };

    if (!isOpen || !article) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm ${isClosing ? '' : 'overlay-fade-in'}`}
            onClick={handleClose}
        >
            <div
                className={`bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative ${isClosing ? 'modal-zoom-out' : 'modal-zoom-in'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Tombol Tutup */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={24} className="text-gray-700" />
                </button>

                {/* Gambar Artikel */}
                <div className="h-64 md:h-96 w-full overflow-hidden bg-gradient-to-br from-primary to-primary-light">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>`;
                        }}
                    />
                </div>

                {/* Konten Artikel */}
                <div className="p-6 md:p-8">
                    {/* Tanggal */}
                    <span className="text-sm text-gray-500 block mb-3">{article.date}</span>

                    {/* Judul */}
                    <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                        {article.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-lg text-gray-700 mb-6 italic border-l-4 border-primary pl-4">
                        {article.excerpt}
                    </p>

                    {/* Full Content */}
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        {article.content.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Tombol Tutup yang Berada di Bawah*/}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={handleClose}
                            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleModal;
