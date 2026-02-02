import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({
    children,
    delay = 0,
    direction = 'up',
    threshold = 0.1
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: threshold,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold]);

    return (
        <div
            ref={elementRef}
            className={`scroll-reveal scroll-reveal-${direction} ${isVisible ? 'active' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
