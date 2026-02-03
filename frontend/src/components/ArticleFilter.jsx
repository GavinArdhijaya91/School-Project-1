import React from 'react';

const ArticleFilter = ({ categories, activeCategory, onFilterChange }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
                onClick={() => onFilterChange('all')}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeCategory === 'all'
                        ? 'bg-primary dark:bg-primary-light text-white shadow-lg scale-105'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
            >
                Semua
            </button>
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onFilterChange(category.id)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeCategory === category.id
                            ? 'bg-primary dark:bg-primary-light text-white shadow-lg scale-105'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                >
                    {category.name}
                    {category.count > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            {category.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default ArticleFilter;
