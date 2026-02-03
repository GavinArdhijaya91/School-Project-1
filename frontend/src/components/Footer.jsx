import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Beranda', href: '#beranda' },
        { name: 'Artikel', href: '#articles' },
        { name: 'Program', href: '#programs' },
        { name: 'Staf Pengajar', href: '#staff' },
        { name: 'Kontak', href: '#contact' },
    ];

    const socialLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            href: 'https://facebook.com/sman1jelita',
            color: 'hover:text-blue-400'
        },
        {
            name: 'Instagram',
            icon: Instagram,
            href: 'https://instagram.com/sman1jelita',
            color: 'hover:text-pink-400'
        },
        {
            name: 'YouTube',
            icon: Youtube,
            href: 'https://youtube.com/@sman1jelita',
            color: 'hover:text-red-400'
        },
    ];

    return (
        <React.Fragment>
            <footer className="bg-primary-dark dark:bg-gray-950 text-white pt-12 pb-6 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        {/* About Section */}
                        <div className="lg:col-span-2">
                            <h3 className="text-2xl font-bold mb-4">SMA NEGERI 1 JELITA</h3>
                            <p className="text-gray-300 dark:text-gray-400 mb-4 leading-relaxed">
                                Mewujudkan generasi cerdas, berkarakter, dan berwawasan global berlandaskan iman dan takwa.
                            </p>
                            <div className="flex gap-4 mt-6">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-3 bg-white/10 dark:bg-gray-800 rounded-full transition-all duration-300 ${social.color} hover:scale-110 interactive-element`}
                                            aria-label={social.name}
                                            title={social.name}
                                        >
                                            <Icon size={20} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Tautan Cepat</h3>
                            <ul className="space-y-2">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors inline-block"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 text-gray-300 dark:text-gray-400">
                                    <MapPin size={18} className="flex-shrink-0 mt-1" />
                                    <span className="text-sm">Jl. Pendidikan No. 123, Jelita, Jakarta Pusat 10110</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300 dark:text-gray-400">
                                    <Phone size={18} className="flex-shrink-0" />
                                    <a href="tel:+622112345678" className="text-sm hover:text-accent transition-colors">
                                        (021) 1234-5678
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300 dark:text-gray-400">
                                    <Mail size={18} className="flex-shrink-0" />
                                    <a href="mailto:info@sman1jelita.sch.id" className="text-sm hover:text-accent transition-colors">
                                        info@sman1jelita.sch.id
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-600 dark:border-gray-800 pt-6 mt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-400 dark:text-gray-500 text-sm text-center md:text-left">
                                &copy; {currentYear} SMA Negeri 1 Jelita. All rights reserved.
                            </p>
                            <p className="text-gray-400 dark:text-gray-500 text-sm text-center md:text-right">
                                Made with ❤️ for Education
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
