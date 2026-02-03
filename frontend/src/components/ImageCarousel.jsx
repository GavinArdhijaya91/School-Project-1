import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, images.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setIsAutoPlaying(false);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    const openLightbox = () => {
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    return (
        <>
            <div
                className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl group"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                {/* Foto */}
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={openLightbox}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                            <h3 className="text-white text-xl md:text-2xl font-bold">{image.title}</h3>
                            <p className="text-gray-200 text-sm md:text-base">{image.description}</p>
                        </div>
                    </div>
                ))}

                {/* Panah Navigasi */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 interactive-element"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 interactive-element"
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Titik pagination */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overlay-fade-in">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 transition-colors"
                        aria-label="Close lightbox"
                    >
                        <X size={32} />
                    </button>
                    <img
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        className="max-w-full max-h-full object-contain modal-zoom-in"
                    />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                        <h3 className="text-white text-2xl font-bold mb-2">{images[currentIndex].title}</h3>
                        <p className="text-gray-300">{images[currentIndex].description}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageCarousel;
