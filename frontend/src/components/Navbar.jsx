import React, { useState } from 'react';
import { School } from 'lucide-react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Beranda', path: '#beranda' },
        { name: 'Artikel', path: '#articles' },
        { name: 'Program Sekolah', path: '#programs' },
        { name: 'Staf Pengajar', path: '#staff' },
    ];

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
            <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <a href="#beranda" onClick={(e) => handleClick(e, '#beranda')} className="flex items-center space-x-2">
                                <img src="../public/SMA Negeri 1 Jelita (2).png" alt="Logo" className="w-18 h-18"/>
                                <span className="font-semibold text-lg
                                " style={{fontFamily: 'Inter, sans-serif'}}>SMA NEGERI 1 JELITA</span>
                        </a>

                        {/* Menu Desktop */}
                        <div className="hidden md:flex space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={(e) => handleClick(e, link.path)}
                                    className={`nav-link interactive-element relative transition-colors duration-220 ${link.name === 'Beranda' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {link.name === 'Beranda' ? 'Beranda' : link.name}
                               </a>
                            ))}
                        </div>

                        {/* Tombol Mobile Menu */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Menu Mobile */}
                    {isOpen && (
                        <div className="md:hidden pb-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={(e) => handleClick(e, link.path)}
                                    className="block py-2 px-4 text-sm hover:bg-primary-dark"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
        </React.Fragment>
    );
};

export default Navbar;
