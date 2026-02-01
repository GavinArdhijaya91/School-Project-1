import React from 'react';
import PageTransition from '../components/PageTransition';

const Articles = () => {
    // Dummy data for articles
    const articles = [
        { id: 1, title: 'Prestasi Siswa di Olimpiade Sains', date: '20 Okt 2025', excerpt: 'Siswa kami berhasil meraih medali emas dalam kompetisi tingkat nasional...' },
        { id: 2, title: 'Penerimaan Peserta Didik Baru', date: '15 Okt 2025', excerpt: 'Informasi lengkap mengenai jadwal dan persyaratan PPDB tahun ajaran ini...' },
        { id: 3, title: 'Kegiatan Bakti Sosial OSIS', date: '10 Okt 2025', excerpt: 'OSIS mengadakan bakti sosial ke panti asuhan sebagai bentuk kepedulian...' },
        { id: 4, title: 'Workshop Robotik', date: '05 Okt 2025', excerpt: 'Mengembangkan kreativitas siswa melalui teknologi robotika terkini...' },
        { id: 5, title: 'Lomba Kebersihan Kelas', date: '01 Okt 2025', excerpt: 'Meningkatkan kesadaran akan pentingnya lingkungan belajar yang bersih...' },
        { id: 6, title: 'Seminar Perguruan Tinggi', date: '28 Sep 2025', excerpt: 'Mempersiapkan siswa kelas XII untuk melanjutkan ke jenjang pendidikan tinggi...' },
    ];

    return (
        <React.Fragment>
        <PageTransition>
            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4">
                    <h1 className="section-title">Artikel & Berita</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-gray-300 w-full flex items-center justify-center text-gray-500">
                                    Article Image
                                </div>
                                <div className="p-6">
                                    <span className="text-sm text-gray-500 block mb-2">{article.date}</span>
                                    <h2 className="text-xl font-bold mb-3 text-primary-dark">{article.title}</h2>
                                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                                    <button className="text-primary font-semibold hover:text-primary-dark interactive-element">Baca Selengkapnya &rarr;</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageTransition>
        </React.Fragment>
    );
};

export default Articles;
