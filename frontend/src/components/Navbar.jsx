import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('beranda');

    const navLinks = [
        { name: 'Beranda', path: '#beranda', id: 'beranda' },
        { name: 'Artikel', path: '#articles', id: 'articles' },
        { name: 'Program', path: '#programs', id: 'programs' },
        { name: 'Staf Pengajar', path: '#staff', id: 'staff' },
    ];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navLinks.forEach((link) => {
            const element = document.querySelector(link.path);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (e, path) => {
        e.preventDefault();
        setIsOpen(false);

        const element = document.querySelector(path);
        if (element) {
            const offset = 60;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <React.Fragment>
            <nav className="bg-primary text-white sticky top-0 z-50 shadow-md" style={{ padding: '0px' }}>
                <div className="container mx-auto px-3 py-3 flex justify-between items-center">
                    <div className="text-lg md:text-2xl font-bold">
                        <img src="../public/SMA Negeri 1 Jelita (2).png" alt="Logo SMA Negeri 1 Jelita" className="w-17 h-17 mr-1 inline-block justify-center align-center" />
                        <a href="#beranda" onClick={(e) => handleClick(e, '#beranda')} className="text-center justify-center mr-10 inline-block">
                            SMAN 1 JELITA
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.path}
                                onClick={(e) => handleClick(e, link.path)}
                                className={`relative nav-link hover:text-white transition-colors ${link.name === 'Beranda' ? 'active' : ''} ${link.name === 'Artikel' && 'text-gray-300'} ${link.name === 'Program' && 'text-gray-300'} ${link.name === 'Staf Pengajar' && 'text-gray-300'}`}
                            >
                                {link.name}

                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className={`hamburger ${isOpen ? 'hamburger-open' : ''}`}>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-primary-dark mobile-menu mobile-menu-enter absolute left-0 right-0 top-full shadow-lg">
                        <div className="flex flex-col space-y-4 px-4 py-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.path}
                                    onClick={(e) => handleClick(e, link.path)}
                                    className={`relative nav-link hover:text-gray-200 transition-colors py-2 mobile-menu-item ${activeSection === link.id ? 'active text-accent' : ''
                                        }`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </React.Fragment>
    );
};

export default Navbar;
