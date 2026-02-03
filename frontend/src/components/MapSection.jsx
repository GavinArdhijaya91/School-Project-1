import React from 'react';
import { MapPin } from 'lucide-react';

const MapSection = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
            <div className="p-6 bg-primary dark:bg-gray-900 text-white">
                <div className="flex items-center gap-3">
                    <MapPin size={24} />
                    <h3 className="text-2xl font-bold">Lokasi Sekolah</h3>
                </div>
            </div>

            {/* Google Maps Embed */}
            <div className="relative w-full h-96">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1944491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonas!5e0!3m2!1sen!2sid!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi SMA Negeri 1 Jelita"
                    className="absolute inset-0"
                ></iframe>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Alamat Lengkap</h4>
                <p className="text-gray-700 dark:text-gray-300">
                    Jl. Pendidikan No. 123<br />
                    Kelurahan Jelita, Kecamatan Pendidikan<br />
                    Jakarta Pusat, DKI Jakarta 10110<br />
                    Indonesia
                </p>
            </div>
        </div>
    );
};

export default MapSection;
