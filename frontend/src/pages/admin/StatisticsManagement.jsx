import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Save, TrendingUp } from 'lucide-react';

const StatisticsManagement = () => {
    const { token } = useAuth();
    const [statistics, setStatistics] = useState({
        students: 0,
        teachers: 0,
        support: 0
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/statistics');
            const data = await response.json();

            if (data.success) {
                setStatistics(data.data);
            }
        } catch (error) {
            console.error('Error fetching statistics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setStatistics({
            ...statistics,
            [e.target.name]: parseInt(e.target.value) || 0
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:5000/api/statistics', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(statistics)
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'Statistik berhasil diperbarui!' });
                setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            } else {
                setMessage({ type: 'error', text: data.message || 'Gagal memperbarui statistik' });
            }
        } catch (error) {
            console.error('Error updating statistics:', error);
            setMessage({ type: 'error', text: 'Terjadi kesalahan koneksi' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <React.Fragment>
            <AdminLayout>
                <div className="space-y-6">
                    <style>{`
                    body, html, #root, .min-h-screen, .min-h-screen * {
                        cursor: auto !important;
                    }
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
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Kelola Statistik</h1>
                        <p className="text-gray-600 mt-1">Perbarui data statistik sekolah</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        {message.text && (
                            <div className={`mb-6 p-4 rounded-lg ${message.type === 'success'
                                ? 'bg-green-50 text-green-800 border border-green-200'
                                : 'bg-red-50 text-red-800 border border-red-200'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Students */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Jumlah Siswa Aktif
                                </label>
                                <input
                                    type="number"
                                    name="students"
                                    value={statistics.students}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Teachers */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Jumlah Guru
                                </label>
                                <input
                                    type="number"
                                    name="teachers"
                                    value={statistics.teachers}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Support */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Jumlah Dukungan / Reaksi
                                </label>
                                <input
                                    type="number"
                                    name="support"
                                    value={statistics.support}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-5 w-5" />
                                        <span>Simpan Perubahan</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Preview */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Preview Statistik
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Siswa Aktif</p>
                                <p className="text-3xl font-bold text-blue-600">{statistics.students}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Guru</p>
                                <p className="text-3xl font-bold text-green-600">{statistics.teachers}</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Dukungan</p>
                                <p className="text-3xl font-bold text-purple-600">{statistics.support}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default StatisticsManagement;
