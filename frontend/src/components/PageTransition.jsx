import React from 'react';

const PageTransition = ({ children, className = '' }) => {
    return (
        <React.Fragment>
            <div className={`page-transition ${className}`}>
                {children}
            </div>
        </React.Fragment>
    );
};

export default PageTransition;
