import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            id: 1,
            email: 'admin@sman1jelita.sch.id',
            password: await bcrypt.hash('Admin123!', 10),
            name: 'Administrator',
            role: 'admin',
            createdAt: new Date()
        }
    ],

    articles: [
        {
            id: 1,
            title: 'Prestasi Siswa di Olimpiade Sains',
            date: '30 Des 2025',
            category: 'prestasi',
            excerpt: 'Siswa kami berhasil meraih medali emas dalam kompetisi tingkat nasional...',
            author: 'Drs. H. Ahmad Fauzi',
            image: '../resources/artikel-image/olimpiade-sains.jpg',
            content: `SMA Negeri 1 Jelita kembali mengukir prestasi membanggakan di ajang Olimpiade Sains Nasional (OSN) 2025. Tim siswa kami berhasil meraih medali emas dalam kategori Biologi dan medali perak dalam kategori Fisika.
                    Prestasi gemilang ini diraih oleh Ahmad Rizki (kelas XII MIPA 1) yang berhasil meraih medali emas dalam bidang Biologi setelah melalui kompetisi ketat dengan peserta dari seluruh Indonesia. Sementara itu, Siti Nurhaliza (kelas XI MIPA 2) berhasil meraih medali perak dalam bidang Fisika.
                    "Ini adalah hasil kerja keras dan dedikasi tinggi dari para siswa yang telah mempersiapkan diri dengan sangat baik. Mereka telah berlatih intensif selama berbulan-bulan dengan bimbingan guru-guru terbaik kami," ujar Kepala Sekolah, Drs. H. Ahmad Fauzi.
                    Prestasi ini semakin menegaskan komitmen SMA Negeri 1 Jelita dalam mengembangkan potensi akademik siswa dan mencetak generasi yang berprestasi di tingkat nasional maupun internasional.`,
            createdAt: new Date('2025-12-30')
        },
        {
            id: 2,
            title: 'Penerimaan Peserta Didik Baru',
            date: '28 Nov 2025',
            category: 'informasi',
            excerpt: 'Informasi lengkap mengenai jadwal dan persyaratan PPDB tahun ajaran ini...',
            author: 'Siti Aminah, S.Pd',
            image: '../resources/artikel-image/ppdb.jpg',
            content: `SMA Negeri 1 Jelita membuka pendaftaran Penerimaan Peserta Didik Baru (PPDB) untuk tahun ajaran 2026/2027. Pendaftaran akan dibuka mulai tanggal 1 Januari 2026 hingga 15 Januari 2026.
                    Jalur pendaftaran yang tersedia meliputi jalur prestasi, jalur zonasi, dan jalur afirmasi. Untuk jalur prestasi, calon siswa dapat mendaftar dengan membawa sertifikat prestasi akademik atau non-akademik tingkat kabupaten/kota atau lebih tinggi.
                    Persyaratan umum yang harus dipenuhi antara lain: fotokopi ijazah atau surat keterangan lulus SMP/MTs, fotokopi kartu keluarga, pas foto terbaru ukuran 3x4 sebanyak 3 lembar, dan surat keterangan sehat dari dokter.
                    Kuota penerimaan siswa baru tahun ini adalah 360 siswa yang akan dibagi menjadi 9 kelas. Informasi lebih lengkap dapat diakses melalui website resmi sekolah atau datang langsung ke sekretariat PPDB di kantor SMA Negeri 1 Jelita.
                    Kami mengundang calon siswa berprestasi untuk bergabung dan menjadi bagian dari keluarga besar SMA Negeri 1 Jelita!`,
            createdAt: new Date('2025-11-28')
        }
    ],

    staff: [
        {
            id: 1,
            name: 'Drs. H. Ahmad Fauzi',
            role: 'Kepala Sekolah',
            image: '../resources/staf-image/Drs. H. Ahmad Fauzi.webp',
            createdAt: new Date()
        },
        {
            id: 2,
            name: 'Siti Aminah, S.Pd',
            role: 'Wakil Kurikulum',
            image: '../resources/staf-image/Siti Aminah, S.Pd.webp',
            createdAt: new Date()
        },
        {
            id: 3,
            name: 'Budi Santoso, M.Kom',
            role: 'Guru TIK',
            image: '../resources/staf-image/Budi Santoso, M.Kom.webp',
            createdAt: new Date()
        }
    ],

    programs: {
        academic: [
            {
                id: 1,
                title: 'MIPA (Matematika & IPA)',
                description: 'Fokus pada pengembangan kemampuan analisis sains dan matematika.',
                type: 'academic',
                createdAt: new Date()
            },
            {
                id: 2,
                title: 'IPS (Ilmu Pengetahuan Sosial)',
                description: 'Mempelajari dinamika masyarakat, ekonomi, sejarah, dan sosiologi.',
                type: 'academic',
                createdAt: new Date()
            },
            {
                id: 3,
                title: 'Bahasa & Budaya',
                description: 'Mendalami bahasa asing dan seni budaya untuk wawasan global.',
                type: 'academic',
                createdAt: new Date()
            }
        ],

        extracurricular: [
            {
                id: 4,
                title: 'Pramuka',
                icon: 'Trophy',
                type: 'extracurricular',
                createdAt: new Date()
            },
            {
                id: 5,
                title: 'Paskibra',
                icon: 'Trophy',
                type: 'extracurricular',
                createdAt: new Date()
            },
            {
                id: 6,
                title: 'Klub Musik',
                icon: 'Music',
                type: 'extracurricular',
                createdAt: new Date()
            }
        ]
    },

    gallery: [
        {
            id: 1,
            src: '../resources/home-image/Gedung-Kelas-Ikhwan-scaled.webp',
            alt: 'Gedung Sekolah',
            title: 'Gedung Sekolah Modern',
            description: 'Fasilitas belajar yang nyaman dan lengkap',
            createdAt: new Date()
        },
        {
            id: 2,
            src: '../resources/artikel-image/olimpiade-sains.jpg',
            alt: 'Prestasi Siswa',
            title: 'Prestasi Gemilang',
            description: 'Siswa berprestasi di tingkat nasional',
            createdAt: new Date()
        }
    ],

    statistics: {
        students: 1445,
        teachers: 53,
        support: 12340,
        lastUpdated: new Date()
    }
};

export const getNextId = (array) => {
    if (array.length === 0) return 1;
    return Math.max(...array.map(item => item.id)) + 1;
};

export default data;
