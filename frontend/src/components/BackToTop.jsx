import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';

const BackToTop = () => {
    const scrollPosition = useScrollPosition();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(scrollPosition > 300);
    }, [scrollPosition]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-primary dark:bg-primary-light text-white shadow-lg hover:shadow-xl transition-all duration-300 interactive-element ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
                }`}
            aria-label="Back to top"
        >
            <ChevronUp size={24} />
        </button>
    );
};

export default BackToTop;
