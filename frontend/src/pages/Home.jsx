import React from 'react';
import { ChevronRight, Award, Users, BookOpen, Book, Trophy, Music, PenTool } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';



const Home = () => {
    const articles = [
        {
            id: 1,
            title: 'Prestasi Siswa di Olimpiade Sains',
            date: '30 Des 2025',
            excerpt: 'Siswa kami berhasil meraih medali emas dalam kompetisi tingkat nasional...',
            image: '../resources/artikel-image/olimpiade-sains.jpg'
        },
        {
            id: 2,
            title: 'Penerimaan Peserta Didik Baru',
            date: '28 Nov 2025',
            excerpt: 'Informasi lengkap mengenai jadwal dan persyaratan PPDB tahun ajaran ini...',
            image: '../resources/artikel-image/ppdb.jpg'
        },
        {
            id: 3,
            title: 'Kegiatan Bakti Sosial OSIS',
            date: '10 Okt 2025',
            excerpt: 'OSIS mengadakan bakti sosial ke panti asuhan sebagai bentuk kepedulian...',
            image: '../resources/artikel-image/bakti-sosial.jpg'
        },
        {
            id: 4,
            title: 'Workshop Robotik',
            date: '05 Okt 2025',
            excerpt: 'Mengembangkan kreativitas siswa melalui teknologi robotika terkini...',
            image: '../resources/artikel-image/workshop-robotik.jpg'
        },
        {
            id: 5,
            title: 'Lomba Kebersihan Kelas',
            date: '01 Okt 2025',
            excerpt: 'Meningkatkan kesadaran akan pentingnya lingkungan belajar yang bersih...',
            image: '../resources/artikel-image/lomba-kebersihan.jpg'
        },
        {
            id: 6,
            title: 'Seminar Perguruan Tinggi',
            date: '28 Sep 2025',
            excerpt: 'Mempersiapkan siswa kelas XII untuk melanjutkan ke jenjang pendidikan tinggi...',
            image: '../resources/artikel-image/seminar-pt.jpg'
        },
    ];

    const staff = [
        { 
            id: 1,
            name: 'Drs. H. Ahmad Fauzi', 
            role: 'Kepala Sekolah', 
            image: '../resources/staf-image/Drs. H. Ahmad Fauzi.webp' 
        },

        { 
            id: 2, 
            name: 'Siti Aminah, S.Pd', 
            role: 'Wakil Kurikulum', 
            image: '../resources/staf-image/Siti Aminah, S.Pd.webp' 
        },

        { 
            id: 3, 
            name: 'Budi Santoso, M.Kom', 
            role: 'Guru TIK', 
            image: '../resources/staf-image/Budi Santoso, M.Kom.webp' 
        },

        { 
            id: 4, 
            name: 'Ratna Dewi, S.Mat', 
            role: 'Guru Matematika', 
            image: '../resources/staf-image/Ratna Dewi, S.Mat.webp' },
        { 
            id: 5, 
            name: 'Agus Wijaya, S.Pd', 
            role: 'Guru Olahraga', 
            image: '../resources/staf-image/Agus Wijaya, S.Pd.webp' 
        },

        { 
            id: 6, 
            name: 'Dewi Lestari, S.Ing', 
            role: 'Guru Bahasa Inggris', 
            image: '../resources/staf-image/Dewi Lestari, S.Ing.webp' 
        },

        { 
            id: 7, 
            name: 'Eko Prasetyo, S.Pd', 
            role: 'Guru Fisika', 
            image: '../resources/staf-image/Eko Prasetyo, S.Pd.webp'
        },

        { 
            id: 8, 
            name: 'Rina Sari, S.Pd', 
            role: 'Guru BK', 
            image: '../resources/staf-image/Rina Sari, S.Pd.webp'
         },
    ];

    const academics = [
        { 
            id: 1, 
            title: 'MIPA (Matematika & IPA)', 
            desc: 'Fokus pada pengembangan kemampuan analisis sains dan matematika.' 
        },

        { 
            id: 2, 
            title: 'IPS (Ilmu Pengetahuan Sosial)', 
            desc: 'Mempelajari dinamika masyarakat, ekonomi, sejarah, dan sosiologi.' 
        },

        { 
            id: 3, 
            title: 'Bahasa & Budaya', 
            desc: 'Mendalami bahasa asing dan seni budaya untuk wawasan global.' 
        },
    ];

    const extracurriculars = [
        { 
            id: 1, 
            title: 'Pramuka', 
            icon: <Trophy size={32} /> 
        },

        { 
            id: 2, 
            title: 'Paskibra', 
            icon: <Trophy size={32} /> 
        },

        { 
            id: 3, 
            title: 'Klub Musik', 
            icon: <Music size={32} /> 
        },

        { 
            id: 4, 
            title: 'Seni Rupa', 
            icon: <PenTool size={32} /> 
        },

        { 
            id: 5, 
            title: 'Karya Ilmiah Remaja', 
            icon: <Book size={32} /> 
        },

        { 
            id: 6, 
            title: 'Basket & Futsal', 
            icon: <Trophy size={32} /> 
        },
    ];

    return (
        <React.Fragment>
            <PageTransition>
                <div className="home-page">
                    {/* Bagian Awal */}
                    <section id="beranda" className="relative text-white py-20 overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-fixed"
                            style={{
                                backgroundImage: "url('../resources/home-image/Gedung-Kelas-Ikhwan-scaled.webp')",
                            }}
                        >
                            <div className="absolute inset-0 bg-black opacity-60"></div>
                        </div>

                        <div className="container mx-auto px-4 text-center relative z-10">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Selamat Datang di SMA Negeri 1 Jelita</h1>
                            <p className="text-xl md:text-2xl mb-8 text-gray-200">
                                Mewujudkan Generasi Emas yang Berkarakter dan Berprestasi
                            </p>
                            <div className="flex justify-center space-x-4">
                                <a href="#programs" className="bg-accent hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center interactive-element">
                                    Lihat Program <ChevronRight size={20} className="ml-2" />
                                </a>
                                <a href="#staff" className="bg-transparent border-2 border-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-full transition-colors interactive-element">
                                    Staf Pengajar
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Bagian Fitur */}
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

                    {/* Bagian Artikel */}
                    <section id="articles" className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <h2 className="section-title">Artikel & Berita</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {articles.map((article, index) => (
                                    <ScrollReveal key={article.id} delay={index * 100} direction="up">
                                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                                            <div className="h-48 w-full overflow-hidden bg-gradient-to-br from-primary to-primary-light">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>`;
                                                    }}
                                                />
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <span className="text-sm text-gray-500 block mb-2">{article.date}</span>
                                                <h2 className="text-xl font-bold mb-3 text-primary-dark">{article.title}</h2>
                                                <p className="text-gray-600 mb-4 flex-1">{article.excerpt}</p>
                                                <button className="text-primary font-semibold hover:text-primary-dark interactive-element">Baca Selengkapnya &rarr;</button>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>

                        </div>
                    </section>


                    {/* Bagian Program */}
                    <section id="programs" className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                            {/* Akademik */}
                            <div className="mb-20">
                                <h2 className="section-title">Program Akademik</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {academics.map((prog, index) => (
                                        <ScrollReveal key={prog.id} delay={index * 150} direction="up">
                                            <div className="bg-white p-8 rounded-lg shadow border-l-4 border-primary hover:translate-y-[-5px] transition-transform">
                                                <h3 className="text-xl font-bold mb-3 text-primary-dark">{prog.title}</h3>
                                                <p className="text-gray-600">{prog.desc}</p>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </div>

                            {/* Ekstrakurikuler */}
                            <div>
                                <h2 className="section-title">Ekstrakurikuler</h2>
                                <p className="text-center text-gray-600 mb-10">Wadah pengembangan bakat dan minat siswa di luar jam pelajaran.</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                    {extracurriculars.map((ex, index) => (
                                        <ScrollReveal key={ex.id} delay={index * 80} direction="up">
                                            <div className="bg-white p-6 rounded-lg shadow text-center hover:bg-primary hover:text-white transition-colors group cursor-pointer interactive-element">
                                                <div className="mb-3 text-primary group-hover:text-white inline-block">
                                                    {ex.icon}
                                                </div>
                                                <h4 className="font-semibold">{ex.title}</h4>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Bagian Staf */}
                    <section id="staff" className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <h2 className="section-title mb-4">Staf Pengajar</h2>
                            <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                                Berkenalan dengan tenaga pendidik profesional yang berdedikasi untuk membimbing siswa-siswi kami mencapai potensi terbaik mereka.
                            </p>

                            {/* Kepala Sekolah */}
                            <div className="flex justify-center mb-12">
                                {staff.filter(person => person.role === 'Kepala Sekolah').map((person) => (
                                    <ScrollReveal key={person.id} delay={0} direction="up">
                                        <div className="text-center group">
                                            <div className="relative mb-6 inline-block overflow-hidden rounded-full border-4 border-primary w-48 h-48">
                                                <img
                                                    src={person.image}
                                                    alt={person.name}
                                                    className="w-full h-full object-cover"
                                                    style={{ objectPosition: 'center 20%' }}
                                                />
                                            </div>
                                            <h3 className="text-xl font-bold text-primary-dark group-hover:text-primary transition-colors mb-2">{person.name}</h3>
                                            <p className="text-gray-600 font-semibold">{person.role}</p>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>

                            {/* Wakil Kurikulum */}
                            <div className="flex justify-center mb-16">
                                {staff.filter(person => person.role === 'Wakil Kurikulum').map((person) => (
                                    <ScrollReveal key={person.id} delay={100} direction="up">
                                        <div className="text-center group">
                                            <div className="relative mb-6 inline-block overflow-hidden rounded-full border-4 border-gray-100 w-44 h-44">
                                                <img
                                                    src={person.image}
                                                    alt={person.name}
                                                    className="w-full h-full object-cover"
                                                    style={{ objectPosition: 'center 20%' }}
                                                />
                                            </div>
                                            <h3 className="text-lg font-bold text-primary-dark group-hover:text-primary transition-colors mb-2">{person.name}</h3>
                                            <p className="text-gray-600 font-semibold">{person.role}</p>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>

                            {/* Guru */}
                            <div>
                                <h3 className="text-2xl font-bold text-center text-primary-dark mb-8">Guru Mata Pelajaran</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                                    {staff.filter(person => person.role !== 'Kepala Sekolah' && person.role !== 'Wakil Kurikulum').map((person, index) => (
                                        <ScrollReveal key={person.id} delay={index * 100} direction="up">
                                            <div className="text-center group">
                                                <div className="relative mb-6 inline-block overflow-hidden rounded-full border-4 border-gray-100 w-40 h-40">
                                                    <img
                                                        src={person.image}
                                                        alt={person.name}
                                                        className="w-full h-full object-cover"
                                                        style={{ objectPosition: 'center 20%' }}
                                                    />
                                                </div>
                                                <h3 className="text-lg font-bold text-primary-dark group-hover:text-primary transition-colors mb-2">{person.name}</h3>
                                                <p className="text-gray-500">{person.role}</p>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </PageTransition>
        </React.Fragment>
    );
};

export default Home;
