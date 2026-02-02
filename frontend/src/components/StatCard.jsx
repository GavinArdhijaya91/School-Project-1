import React, { useState, useEffect, useRef } from 'react';
import useCountUp from '../hooks/useCountUp';

const StatCard = ({ icon: Icon, number, label, suffix = '', delay = 0, iconColor = 'from-primary to-primary-dark' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);
    const count = useCountUp(number, 2000, isVisible);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            },
            { threshold: 0.3 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [delay]);

    return (
        <div
            ref={cardRef}
            className={`bg-white rounded-xl shadow-lg p-8 text-center transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
        >
            <div className="flex justify-center mb-4">
                <div className={`bg-gradient-to-br ${iconColor} p-4 rounded-full`}>
                    <Icon size={40} className="text-white" />
                </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-primary-dark mb-2">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-gray-600 text-lg font-medium">{label}</div>
        </div>
    );
};

export default StatCard;
