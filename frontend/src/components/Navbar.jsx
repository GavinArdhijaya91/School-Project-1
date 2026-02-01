import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, School } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Artikel', path: '/articles' },
        { name: 'Staf Pengajar', path: '/staff' },
        { name: 'Program Sekolah', path: '/programs' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <React.Fragment>
            <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <School size={32} />
                            <span className="font-bold text-xl tracking-tight">SMA NEGERI 1 JELITA</span>
                        </Link>

                        {/* Menu Desktop */}
                        <div className="hidden md:flex space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`nav-link relative transition-colors duration-220 ${isActive(link.path) ? 'text-white font-bold' : 'text-gray-300'
                                        }`}
                                >
                                    {link.name}
                                </Link>
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
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block py-2 px-4 text-sm hover:bg-primary-dark ${isActive(link.path) ? 'bg-primary-dark font-bold' : ''
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
        </React.Fragment>
    );
};

export default Navbar;
