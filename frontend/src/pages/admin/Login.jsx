import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, AlertCircle, Clock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [lockoutInfo, setLockoutInfo] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin/dashboard');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (lockoutInfo && lockoutInfo.remainingSeconds > 0) {
            setRemainingTime(lockoutInfo.remainingSeconds);

            const timer = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setLockoutInfo(null);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [lockoutInfo]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            navigate('/admin/dashboard');
        } else {
            if (result.error.remainingSeconds) {
                setLockoutInfo(result.error);
            } else {
                setError(result.error.message);
            }
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
            <style>{`
                .cursor-follower {
                    display: none !important;
                }
                input, textarea, button, select, a {
                    cursor: pointer !important;
                }
                input[type="text"], input[type="email"], input[type="password"], input[type="number"], textarea {
                    cursor: text !important;
                }
            `}</style>
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center mb-4">
                        <Lock className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">
                        Admin Panel
                    </h2>
                    <p className="mt-2 text-sm text-white">
                        SMA Negeri 1 Jelita
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white shadow-2xl rounded-lg p-8">
                    {lockoutInfo ? (
                        // Lockout Message
                        <div className="text-center">
                            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <Clock className="h-8 w-8 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Akun Terkunci
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Terlalu banyak percobaan login gagal.
                            </p>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-2xl font-bold text-red-600 mb-1">
                                    {remainingTime}
                                </p>
                                <p className="text-sm text-gray-600">
                                    detik tersisa
                                </p>
                            </div>
                            <p className="text-xs text-gray-500 mt-4">
                                Silakan tunggu hingga waktu habis untuk mencoba lagi
                            </p>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-red-800">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>


                            {/* Isian Kata Sandi */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-primary transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Memproses...</span>
                                    </div>
                                ) : (
                                    'Masuk'
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* Footer Info */}
                <div className="text-center">
                    <p className="text-xs text-white">
                        Sistem akan mengunci akun selama 1 menit setelah 3 kali percobaan login gagal
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
