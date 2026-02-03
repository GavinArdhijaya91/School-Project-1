import React, { useState, useMemo } from 'react';
import { ChevronRight, Award, Users, BookOpen, Book, Trophy, Music, PenTool, Heart } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import ArticleModal from '../components/Article';
import StatCard from '../components/StatCard';
import TypeWriter from '../components/TypeWriter';
import ArticleSearch from '../components/ArticleSearch';
import ArticleFilter from '../components/ArticleFilter';
import ImageCarousel from '../components/ImageCarousel';
import Testimonial from '../components/Testimonial';
import ContactForm from '../components/ContactForm';
import MapSection from '../components/MapSection';

const Home = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    // Gallery images for carousel
    const galleryImages = [
        {
            src: '../resources/home-image/Gedung-Kelas-Ikhwan-scaled.webp',
            alt: 'Gedung Sekolah',
            title: 'Gedung Sekolah Modern',
            description: 'Fasilitas belajar yang nyaman dan lengkap'
        },
        {
            src: '../resources/artikel-image/olimpiade-sains.jpg',
            alt: 'Prestasi Siswa',
            title: 'Prestasi Gemilang',
            description: 'Siswa berprestasi di tingkat nasional'
        },
        {
            src: '../resources/artikel-image/workshop-robotik.jpg',
            alt: 'Workshop Robotik',
            title: 'Inovasi Teknologi',
            description: 'Mengembangkan kreativitas melalui teknologi'
        },
    ];

    // Testimonials
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Putri',
            role: 'Alumni 2024 - Mahasiswa UI',
            image: null,
            content: 'SMA Negeri 1 Jelita memberikan fondasi yang kuat untuk masa depan saya. Guru-guru yang berdedikasi dan fasilitas yang lengkap membuat saya siap menghadapi tantangan di perguruan tinggi.',
            rating: 5
        },
        {
            id: 2,
            name: 'Ahmad Rizki',
            role: 'Siswa Kelas XII MIPA',
            image: null,
            content: 'Ekstrakurikuler yang beragam dan program akademik yang berkualitas membantu saya mengembangkan bakat dan minat. Saya bangga menjadi bagian dari keluarga besar SMAN 1 Jelita.',
            rating: 5
        },
        {
            id: 3,
            name: 'Dewi Lestari',
            role: 'Orang Tua Siswa',
            image: null,
            content: 'Sebagai orang tua, saya sangat puas dengan perkembangan anak saya di sekolah ini. Komunikasi yang baik antara sekolah dan orang tua membuat saya tenang dan percaya.',
            rating: 5
        },
    ];

    // Article categories
    const categories = [
        { id: 'prestasi', name: 'Prestasi', count: 2 },
        { id: 'kegiatan', name: 'Kegiatan', count: 3 },
        { id: 'informasi', name: 'Informasi', count: 1 },
    ];

    const articles = [
        {
            id: 1,
            title: 'Prestasi Siswa di Olimpiade Sains',
            date: '30 Des 2025',
            category: 'prestasi',
            excerpt: 'Siswa kami berhasil meraih medali emas dalam kompetisi tingkat nasional...',
            image: '../resources/artikel-image/olimpiade-sains.jpg',
            content: `SMA Negeri 1 Jelita kembali mengukir prestasi membanggakan di ajang Olimpiade Sains Nasional (OSN) 2025. Tim siswa kami berhasil meraih medali emas dalam kategori Biologi dan medali perak dalam kategori Fisika.
                    Prestasi gemilang ini diraih oleh Ahmad Rizki (kelas XII MIPA 1) yang berhasil meraih medali emas dalam bidang Biologi setelah melalui kompetisi ketat dengan peserta dari seluruh Indonesia. Sementara itu, Siti Nurhaliza (kelas XI MIPA 2) berhasil meraih medali perak dalam bidang Fisika.
                    "Ini adalah hasil kerja keras dan dedikasi tinggi dari para siswa yang telah mempersiapkan diri dengan sangat baik. Mereka telah berlatih intensif selama berbulan-bulan dengan bimbingan guru-guru terbaik kami," ujar Kepala Sekolah, Drs. H. Ahmad Fauzi.
                    Prestasi ini semakin menegaskan komitmen SMA Negeri 1 Jelita dalam mengembangkan potensi akademik siswa dan mencetak generasi yang berprestasi di tingkat nasional maupun internasional.`
        },
        {
            id: 2,
            title: 'Penerimaan Peserta Didik Baru',
            date: '28 Nov 2025',
            category: 'informasi',
            excerpt: 'Informasi lengkap mengenai jadwal dan persyaratan PPDB tahun ajaran ini...',
            image: '../resources/artikel-image/ppdb.jpg',
            content: `SMA Negeri 1 Jelita membuka pendaftaran Penerimaan Peserta Didik Baru (PPDB) untuk tahun ajaran 2026/2027. Pendaftaran akan dibuka mulai tanggal 1 Januari 2026 hingga 15 Januari 2026.
                    Jalur pendaftaran yang tersedia meliputi jalur prestasi, jalur zonasi, dan jalur afirmasi. Untuk jalur prestasi, calon siswa dapat mendaftar dengan membawa sertifikat prestasi akademik atau non-akademik tingkat kabupaten/kota atau lebih tinggi.
                    Persyaratan umum yang harus dipenuhi antara lain: fotokopi ijazah atau surat keterangan lulus SMP/MTs, fotokopi kartu keluarga, pas foto terbaru ukuran 3x4 sebanyak 3 lembar, dan surat keterangan sehat dari dokter.
                    Kuota penerimaan siswa baru tahun ini adalah 360 siswa yang akan dibagi menjadi 9 kelas. Informasi lebih lengkap dapat diakses melalui website resmi sekolah atau datang langsung ke sekretariat PPDB di kantor SMA Negeri 1 Jelita.
                    Kami mengundang calon siswa berprestasi untuk bergabung dan menjadi bagian dari keluarga besar SMA Negeri 1 Jelita!`
        },
        {
            id: 3,
            title: 'Kegiatan Bakti Sosial OSIS',
            date: '10 Okt 2025',
            category: 'kegiatan',
            excerpt: 'OSIS mengadakan bakti sosial ke panti asuhan sebagai bentuk kepedulian...',
            image: '../resources/artikel-image/bakti-sosial.jpg',
            content: `Organisasi Siswa Intra Sekolah (OSIS) SMA Negeri 1 Jelita mengadakan kegiatan bakti sosial ke Panti Asuhan Kasih Sayang pada hari Minggu, 8 Oktober 2025. Kegiatan ini diikuti oleh 50 siswa pengurus OSIS dan anggota MPK.
                    Dalam kegiatan ini, para siswa membawa berbagai bantuan berupa sembako, pakaian layak pakai, alat tulis, dan buku-buku pelajaran untuk anak-anak panti asuhan. Selain itu, para siswa juga mengadakan kegiatan bersama seperti bermain games, menyanyi, dan berbagi cerita dengan adik-adik di panti.
                    "Kegiatan ini bertujuan untuk menumbuhkan rasa empati dan kepedulian sosial di kalangan siswa. Kami ingin mengajarkan bahwa berbagi kebahagiaan dengan sesama adalah hal yang sangat penting," ungkap Ketua OSIS, Farhan Maulana.
                    Pengurus panti asuhan menyambut hangat kedatangan siswa-siswi SMA Negeri 1 Jelita dan mengucapkan terima kasih atas bantuan yang diberikan. Kegiatan bakti sosial ini direncanakan akan menjadi agenda rutin OSIS setiap semester.`
        },
        {
            id: 4,
            title: 'Workshop Robotik',
            date: '05 Okt 2025',
            category: 'kegiatan',
            excerpt: 'Mengembangkan kreativitas siswa melalui teknologi robotika terkini...',
            image: '../resources/artikel-image/workshop-robotik.jpg',
            content: `SMA Negeri 1 Jelita mengadakan Workshop Robotik yang diikuti oleh 40 siswa dari kelas X dan XI jurusan MIPA. Workshop ini berlangsung selama tiga hari, dari tanggal 3-5 Oktober 2025, di Laboratorium Komputer sekolah.
                    Workshop ini menghadirkan instruktur profesional dari Komunitas Robotika Indonesia yang membimbing siswa dalam merancang, merakit, dan memprogram robot sederhana. Para siswa belajar tentang dasar-dasar elektronika, pemrograman Arduino, dan mekanika robot.
                    "Workshop ini sangat bermanfaat untuk mengembangkan kreativitas dan kemampuan problem solving siswa. Mereka belajar bagaimana teknologi dapat diaplikasikan untuk menyelesaikan masalah nyata," kata Budi Santoso, M.Kom, Guru TIK yang menjadi koordinator kegiatan.
                    Di akhir workshop, setiap kelompok siswa berhasil membuat robot line follower yang dapat bergerak mengikuti garis secara otomatis. Beberapa karya terbaik akan diikutsertakan dalam kompetisi robotika tingkat provinsi bulan depan.`
        },
        {
            id: 5,
            title: 'Lomba Kebersihan Kelas',
            date: '01 Okt 2025',
            category: 'kegiatan',
            excerpt: 'Meningkatkan kesadaran akan pentingnya lingkungan belajar yang bersih...',
            image: '../resources/artikel-image/lomba-kebersihan.jpg',
            content: `Dalam rangka memperingati Hari Kesehatan Nasional, SMA Negeri 1 Jelita mengadakan Lomba Kebersihan Kelas yang diikuti oleh seluruh kelas dari tingkat X hingga XII. Lomba ini berlangsung selama satu minggu penuh dengan penilaian yang dilakukan setiap hari.
                    Kriteria penilaian meliputi kebersihan lantai, kerapian meja dan kursi, dekorasi kelas, pengelolaan sampah, dan kreativitas dalam menata ruang kelas. Tim juri yang terdiri dari guru dan perwakilan siswa melakukan inspeksi mendadak untuk memastikan kebersihan terjaga secara konsisten.
                    Hasil lomba diumumkan pada hari Jumat, 29 September 2025. Juara pertama diraih oleh kelas XI MIPA 2, juara kedua kelas X IPS 1, dan juara ketiga kelas XII Bahasa. Masing-masing kelas pemenang mendapatkan piala, sertifikat, dan hadiah berupa peralatan kebersihan kelas.
                    "Lomba ini bertujuan untuk menumbuhkan kesadaran siswa akan pentingnya menjaga kebersihan lingkungan belajar. Lingkungan yang bersih akan menciptakan suasana belajar yang nyaman dan kondusif," ujar Wakil Kepala Sekolah bidang Kesiswaan.`
        },
        {
            id: 6,
            title: 'Seminar Perguruan Tinggi',
            date: '28 Sep 2025',
            category: 'prestasi',
            excerpt: 'Mempersiapkan siswa kelas XII untuk melanjutkan ke jenjang pendidikan tinggi...',
            image: '../resources/artikel-image/seminar-pt.jpg',
            content: `SMA Negeri 1 Jelita mengadakan Seminar Perguruan Tinggi yang dihadiri oleh seluruh siswa kelas XII. Acara ini menghadirkan perwakilan dari berbagai universitas ternama di Indonesia seperti UI, ITB, UGM, dan ITS.
                    Seminar yang berlangsung di Aula sekolah ini memberikan informasi lengkap tentang jalur masuk perguruan tinggi, program studi yang tersedia, beasiswa yang ditawarkan, dan tips sukses dalam menghadapi ujian masuk perguruan tinggi.
                    Para perwakilan universitas juga membagikan pengalaman dan memberikan motivasi kepada siswa untuk terus belajar dan mempersiapkan diri dengan baik. Sesi tanya jawab yang berlangsung sangat interaktif dengan banyak siswa yang antusias bertanya tentang jurusan dan prospek karir.
                    "Seminar ini sangat membantu kami dalam menentukan pilihan universitas dan jurusan yang sesuai dengan minat dan bakat. Informasi yang diberikan sangat lengkap dan jelas," ungkap Dina, siswi kelas XII MIPA 1.
                    Acara ditutup dengan pembagian brosur dan formulir pendaftaran dari masing-masing universitas. Sekolah berharap seminar ini dapat membantu siswa dalam mempersiapkan masa depan pendidikan mereka.`
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
            image: '../resources/staf-image/Ratna Dewi, S.Mat.webp'
        },
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

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.content.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [articles, searchTerm, activeCategory]);

    const handleOpenArticle = (article) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedArticle(null), 300);
    };

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
                            <h1 className="text-2xl md:text-5xl text-center font-bold mb-6 min-h-[4rem] md:min-h-[6rem] flex items-center justify-center">
                                <TypeWriter
                                    scenes={[
                                        'Selamat Datang di SMA Negeri 1 Jelita',
                                        'Cerdas',
                                        'Inovatif',
                                        'dan Berintegritas'
                                    ]}
                                />
                            </h1>
                            <p className="text-md md:text-2xl mb-8 text-gray-200">
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

                     {/* Bagian Kumpulan Galeri */}
                    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                        <div className="container mx-auto px-4">
                            <h2 className="section-title" style={{color: 'white'}}>Galeri Sekolah</h2>
                            <p className="text-center text-white-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                                Lihat fasilitas dan kegiatan di SMA Negeri 1 Jelita
                            </p>
                            <ImageCarousel images={galleryImages} />
                        </div>
                    </section>

                    {/* Bagian Fitur */}
                    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
                        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-6 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-lg transition-shadow card-hover">
                                <Award size={48} className="text-primary dark:text-primary-light mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2 dark:text-white">Akreditasi A</h3>
                                <p className="text-gray-600 dark:text-gray-400">Terakreditasi A dengan standar pendidikan berkualitas tinggi.</p>
                            </div>
                            <div className="p-6 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-lg transition-shadow card-hover">
                                <Users size={48} className="text-primary dark:text-primary-light mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2 dark:text-white">Guru Profesional</h3>
                                <p className="text-gray-600 dark:text-gray-400">Dididik oleh tenaga pengajar berpengalaman dan tersertifikasi.</p>
                            </div>
                            <div className="p-6 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-lg transition-shadow card-hover">
                                <BookOpen size={48} className="text-primary dark:text-primary-light mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2 dark:text-white">Kurikulum Merdeka</h3>
                                <p className="text-gray-600 dark:text-gray-400">Menerapkan kurikulum terbaru untuk pengembangan minat siswa.</p>
                            </div>
                        </div>
                    </section>

                    {/* Bagian Statistik */}
                    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                                SMA Negeri 1 Jelita Saat Ini
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                <StatCard
                                    icon={Users}
                                    number={1445}
                                    label="Siswa Aktif"
                                    delay={0}
                                    iconColor="from-blue-500 to-cyan-600"
                                />
                                <StatCard
                                    icon={Award}
                                    number={53}
                                    label="Guru Profesional"
                                    delay={200}
                                    iconColor="from-yellow-400 to-orange-500"
                                />
                                <StatCard
                                    icon={Heart}
                                    number={12340}
                                    suffix="+"
                                    label="Dukungan Masyarakat"
                                    delay={400}
                                    iconColor="from-red-500 to-pink-600"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Bagian Artikel */}
                    <section id="articles" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                        <div className="container mx-auto px-4 text-white">
                            <h2 className="section-title text-white" style={{ color: 'white' }}>Artikel & Berita</h2>

                            {/* Pencarian dan Filter */}
                            <ArticleSearch onSearch={setSearchTerm} />
                            <ArticleFilter
                                categories={categories}
                                activeCategory={activeCategory}
                                onFilterChange={setActiveCategory}
                            />

                            {/* Grid Artikel */}
                            {filteredArticles.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredArticles.map((article, index) => (
                                        <ScrollReveal key={article.id} delay={index * 100} direction="up">
                                            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col card-hover">
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
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 block mb-2">{article.date}</span>
                                                    <h2 className="text-xl font-bold mb-3 text-primary-dark dark:text-white">{article.title}</h2>
                                                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{article.excerpt}</p>
                                                    <button
                                                        onClick={() => handleOpenArticle(article)}
                                                        className="text-primary dark:text-primary-light font-semibold hover:text-primary-dark dark:hover:text-accent interactive-element"
                                                    >
                                                        Baca Selengkapnya &rarr;
                                                    </button>
                                                </div>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 dark:text-gray-400 text-lg">Tidak ada artikel yang ditemukan.</p>
                                </div>
                            )}

                        </div>
                    </section>

                    {/* Bagian Testimoni */}
                    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
                        <div className="container mx-auto px-4">
                            <h2 className="section-title" style={{color: 'white'}}>Testimoni</h2>
                            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                                Apa kata mereka tentang SMA Negeri 1 Jelita
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {testimonials.map((testimonial, index) => (
                                    <ScrollReveal key={testimonial.id} delay={index * 150} direction="up">
                                        <Testimonial testimonial={testimonial} />
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Bagian Kontak */}
                    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                        <div className="container mx-auto px-4">
                            <h2 className="section-title" style={{color: 'white'}}>Hubungi Kami</h2>
                            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                                Ada pertanyaan? Jangan ragu untuk menghubungi kami
                            </p>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <ScrollReveal delay={0} direction="left">
                                    <ContactForm />
                                </ScrollReveal>
                                <ScrollReveal delay={200} direction="right">
                                    <MapSection />
                                </ScrollReveal>
                            </div>
                        </div>
                    </section>


                    {/* Bagian Program */}
                    <section id="programs" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
                        <div className="container mx-auto px-4">
                            {/* Akademik */}
                            <div className="mb-20">
                                <h2 className="section-title" style={{color: 'white'}}>Program Akademik</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {academics.map((prog, index) => (
                                        <ScrollReveal key={prog.id} delay={index * 150} direction="up">
                                            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow border-l-4 border-primary dark:border-primary-light hover:translate-y-[-5px] transition-transform card-hover">
                                                <h3 className="text-xl font-bold mb-3 text-primary-dark dark:text-white">{prog.title}</h3>
                                                <p className="text-gray-600 dark:text-gray-300">{prog.desc}</p>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </div>

                            {/* Ekstrakurikuler */}
                            <div>
                                <h2 className="section-title" style={{color: 'white'}}>Ekstrakurikuler</h2>
                                <p className="text-center text-gray-600 dark:text-gray-400 mb-10">Wadah pengembangan bakat dan minat siswa di luar jam pelajaran.</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                    {extracurriculars.map((ex, index) => (
                                        <ScrollReveal key={ex.id} delay={index * 80} direction="up">
                                            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow text-center hover:bg-primary dark:hover:bg-primary-light hover:text-white transition-colors group cursor-pointer interactive-element">
                                                <div className="mb-3 text-primary dark:text-primary-light group-hover:text-white inline-block">
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

                    {/* Bagian Staf Pengajar */}
                    <section id="staff" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                        <div className="container mx-auto px-4">
                            <h2 className="section-title" style={{color: 'white'}}>Staf Pengajar</h2>
                            <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">Tenaga pendidik profesional dan berpengalaman yang siap membimbing siswa.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {staff.map((staffMember, index) => (
                                    <ScrollReveal key={staffMember.id} delay={index * 100} direction="up">
                                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow text-center card-hover">
                                            <div className="h-64 w-full overflow-hidden bg-gradient-to-br from-primary to-primary-light">
                                                <img
                                                    src={staffMember.image}
                                                    alt={staffMember.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>`;
                                                    }}
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-primary-dark dark:text-white mb-2">{staffMember.name}</h3>
                                                <p className="text-gray-600 dark:text-gray-300">{staffMember.role}</p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Article Modal */}
                <ArticleModal
                    article={selectedArticle}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </PageTransition>
        </React.Fragment>
    );
};

export default Home;
