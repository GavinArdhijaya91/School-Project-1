import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, BookOpen, Image, TrendingUp, Plus } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const Dashboard = () => {
    const [stats, setStats] = useState({
        articles: 0,
        staff: 0,
        programs: 0,
        gallery: 0
    });
    const [recentArticles, setRecentArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [articlesRes, staffRes, programsRes, galleryRes] = await Promise.all([
                fetch('http://localhost:5000/api/articles'),
                fetch('http://localhost:5000/api/staff'),
                fetch('http://localhost:5000/api/programs'),
                fetch('http://localhost:5000/api/gallery')
            ]);

            const [articlesData, staffData, programsData, galleryData] = await Promise.all([
                articlesRes.json(),
                staffRes.json(),
                programsRes.json(),
                galleryRes.json()
            ]);

            setStats({
                articles: articlesData.data?.length || 0,
                staff: staffData.data?.length || 0,
                programs: (programsData.data?.academic?.length || 0) + (programsData.data?.extracurricular?.length || 0),
                gallery: galleryData.data?.length || 0
            });

            setRecentArticles(articlesData.data?.slice(0, 5) || []);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Artikel',
            value: stats.articles,
            icon: FileText,
            color: 'bg-blue-500',
            link: '/admin/articles'
        },
        {
            title: 'Staff Pengajar',
            value: stats.staff,
            icon: Users,
            color: 'bg-green-500',
            link: '/admin/staff'
        },
        {
            title: 'Program',
            value: stats.programs,
            icon: BookOpen,
            color: 'bg-purple-500',
            link: '/admin/programs'
        },
        {
            title: 'Galeri',
            value: stats.gallery,
            icon: Image,
            color: 'bg-orange-500',
            link: '/admin/gallery'
        },
    ];

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
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Selamat datang di Admin Panel SMA Negeri 1 Jelita</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Link
                                key={stat.title}
                                to={stat.link}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all transform hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-lg`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Recent Articles */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Artikel Terbaru</h2>
                        <Link
                            to="/admin/articles"
                            className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
                        >
                            <Plus className="h-4 w-4" />
                            Tambah Artikel
                        </Link>
                    </div>

                    {recentArticles.length > 0 ? (
                        <div className="space-y-3">
                            {recentArticles.map((article) => (
                                <div
                                    key={article.id}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{article.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {article.date} • {article.category}
                                        </p>
                                    </div>
                                    <Link
                                        to="/admin/articles"
                                        className="text-primary hover:text-primary-dark font-medium text-sm"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">Belum ada artikel</p>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                        to="/admin/articles"
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all flex items-center gap-4"
                    >
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Kelola Artikel</h3>
                            <p className="text-sm text-gray-500">Tambah, edit, atau hapus artikel</p>
                        </div>
                    </Link>

                    <Link
                        to="/admin/staff"
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all flex items-center gap-4"
                    >
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Kelola Staff</h3>
                            <p className="text-sm text-gray-500">Atur data staff pengajar</p>
                        </div>
                    </Link>

                    <Link
                        to="/admin/statistics"
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all flex items-center gap-4"
                    >
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Update Statistik</h3>
                            <p className="text-sm text-gray-500">Perbarui data statistik sekolah</p>
                        </div>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
