import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="bg-primary-dark text-white pt-10 pb-6">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Info Sekolah */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">SMA NEGERI 1 JELITA</h3>
                        <p className="text-gray-300 mb-4">
                            Mewujudkan generasi cerdas, berkarakter, dan berwawasan global berlandaskan iman dan takwa.
                        </p>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-gray-300">
                                <MapPin size={18} />
                                <span>Jl. Pendidikan No. 1, Jakarta</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-300">
                                <Phone size={18} />
                                <span>(021) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-300">
                                <Mail size={18} />
                                <span>info@smancontoh.sch.id</span>
                            </div>
                        </div>
                    </div>

                    {/* Sosial */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Ikuti Kami</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-accent transition-colors"><Facebook /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Instagram /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Twitter /></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-600 mt-8 pt-6 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} SMA Negeri Contoh. All rights reserved.
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
