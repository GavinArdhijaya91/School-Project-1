import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
                <BackToTop />
            </div>
        </React.Fragment>
    );
};

export default Layout;
