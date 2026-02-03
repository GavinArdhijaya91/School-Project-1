import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nama harus diisi';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email harus diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subjek harus diisi';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Pesan harus diisi';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Pesan minimal 10 karakter';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            // Clear success message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-primary-dark dark:text-white mb-6">Hubungi Kami</h3>

            {/* Contact Info */}
            <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <MapPin size={20} className="text-primary dark:text-primary-light flex-shrink-0" />
                    <span>Jl. Pendidikan No. 123, Jelita, Indonesia</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Phone size={20} className="text-primary dark:text-primary-light flex-shrink-0" />
                    <span>(021) 1234-5678</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Mail size={20} className="text-primary dark:text-primary-light flex-shrink-0" />
                    <span>info@sman1jelita.sch.id</span>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${errors.name
                                ? 'border-red-500 dark:border-red-400'
                                : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary dark:focus:border-primary-light focus:outline-none transition-colors`}
                        placeholder="Masukkan nama lengkap"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${errors.email
                                ? 'border-red-500 dark:border-red-400'
                                : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary dark:focus:border-primary-light focus:outline-none transition-colors`}
                        placeholder="nama@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Subjek <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${errors.subject
                                ? 'border-red-500 dark:border-red-400'
                                : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary dark:focus:border-primary-light focus:outline-none transition-colors`}
                        placeholder="Topik pesan"
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.subject}</p>}
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Pesan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className={`w-full px-4 py-3 rounded-lg border-2 ${errors.message
                                ? 'border-red-500 dark:border-red-400'
                                : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary dark:focus:border-primary-light focus:outline-none transition-colors resize-none`}
                        placeholder="Tulis pesan Anda di sini..."
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message}</p>}
                </div>

                {/* Submit Status Messages */}
                {submitStatus === 'success' && (
                    <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 rounded-lg">
                        Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded-lg">
                        Terjadi kesalahan. Silakan coba lagi nanti.
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary dark:bg-primary-light hover:bg-primary-dark dark:hover:bg-primary text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed interactive-element"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Mengirim...
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            Kirim Pesan
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
