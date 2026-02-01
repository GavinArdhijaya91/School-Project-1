import React from 'react';
import { ChevronRight, Award, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <React.Fragment>
        <div className="home-page">
            {/* Hero Section */}
            <section className="bg-primary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Selamat Datang di SMA Negeri Contoh</h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200">
                        Mewujudkan Generasi Emas yang Berkarakter dan Berprestasi
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/programs" className="bg-accent hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center">
                            Lihat Program <ChevronRight size={20} className="ml-2" />
                        </Link>
                        <Link to="/staff" className="bg-transparent border-2 border-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-full transition-colors">
                            Staf Pengajar
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features / Stats */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
                        <Award size={48} className="text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Akreditasi A</h3>
                        <p className="text-gray-600">Terakreditasi A dengan standar pendidikan berkualitas tinggi.</p>
                    </div>
                    <div className="p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
                        <Users size={48} className="text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Guru Profesional</h3>
                        <p className="text-gray-600">Dididik oleh tenaga pengajar berpengalaman dan tersertifikasi.</p>
                    </div>
                    <div className="p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
                        <BookOpen size={48} className="text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Kurikulum Merdeka</h3>
                        <p className="text-gray-600">Menerapkan kurikulum terbaru untuk pengembangan minat siswa.</p>
                    </div>
                </div>
            </section>

            {/* Featured News (Placeholder) */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="section-title">Berita Terbaru</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md">
                                <div className="h-48 bg-gray-300 w-full flex items-center justify-center text-gray-500">
                                    Respresentative Image
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2">Kegiatan Upacara Bendera</h3>
                                    <p className="text-gray-600 text-sm mb-4">Senin, 10 Oktober 2025</p>
                                    <Link to="/articles" className="text-primary font-semibold hover:underline">Baca Selengkapnya</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link to="/articles" className="btn btn-outline text-primary border-primary">Lihat Semua Berita</Link>
                    </div>
                </div>
            </section>
        </div>
        </React.Fragment>
    );
};

export default Home;
