import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';

const BackToTop = () => {
    const scrollPosition = useScrollPosition();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        // Hide if we are within 200px of the bottom (approaching footer)
        // AND keep visible otherwise
        const nearBottom = maxScroll - scrollPosition < 200;
        setIsVisible(!nearBottom);
    }, [scrollPosition]);

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    return (
        <React.Fragment>
            <button
                onClick={scrollToBottom}
                className={`fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-primary dark:bg-primary-light text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 scroll-to-bottom-btn ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}`}
                aria-label="Scroll to bottom"
            >
                <ChevronDown size={24} />
            </button>
        </React.Fragment>
    );
};

export default BackToTop;
