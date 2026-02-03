import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonial = ({ testimonial }) => {
    const { name, role, image, content, rating } = testimonial;

    return (
        <React.Fragment>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-primary to-primary-light flex-shrink-0">
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                            {name.charAt(0)}
                        </div>
                    )}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
                </div>
            </div>

            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        size={18}
                        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                    />
                ))}
            </div>

            <div className="relative">
                <Quote size={32} className="absolute -top-2 -left-2 text-primary/20 dark:text-primary-light/20" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-6 italic">
                    "{content}"
                </p>
            </div>
        </div>
        </React.Fragment>
    );
};

export default Testimonial;
