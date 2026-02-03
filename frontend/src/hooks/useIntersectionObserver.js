import { useEffect, useState } from 'react';

export const useIntersectionObserver = (elementRef, options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, {
            threshold: 0.5,
            ...options
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [elementRef, options]);

    return isIntersecting;
};
