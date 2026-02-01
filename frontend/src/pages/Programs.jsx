import React from 'react';
import { Book, Trophy, Music, PenTool } from 'lucide-react';

const Programs = () => {
    const academics = [
        { id: 1, title: 'MIPA (Matematika & IPA)', desc: 'Fokus pada pengembangan kemampuan analisis sains dan matematika.' },
        { id: 2, title: 'IPS (Ilmu Pengetahuan Sosial)', desc: 'Mempelajari dinamika masyarakat, ekonomi, sejarah, dan sosiologi.' },
        { id: 3, title: 'Bahasa & Budaya', desc: 'Mendalami bahasa asing dan seni budaya untuk wawasan global.' },
    ];

    const extracurriculars = [
        { id: 1, title: 'Pramuka', icon: <Trophy size={32} /> },
        { id: 2, title: 'Paskibra', icon: <Trophy size={32} /> },
        { id: 3, title: 'Klub Musik', icon: <Music size={32} /> },
        { id: 4, title: 'Seni Rupa', icon: <PenTool size={32} /> },
        { id: 5, title: 'Karya Ilmiah Remaja', icon: <Book size={32} /> },
        { id: 6, title: 'Basket & Futsal', icon: <Trophy size={32} /> },
    ];

    return (
        <React.Fragment>
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">

                {/* Akademik */}
                <div className="mb-20">
                    <h1 className="section-title">Program Akademik</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {academics.map((prog) => (
                            <div key={prog.id} className="bg-white p-8 rounded-lg shadow border-l-4 border-primary hover:translate-y-[-5px] transition-transform">
                                <h3 className="text-xl font-bold mb-3 text-primary-dark">{prog.title}</h3>
                                <p className="text-gray-600">{prog.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ekstrakurikuler */}
                <div>
                    <h1 className="section-title">Ekstrakurikuler</h1>
                    <p className="text-center text-gray-600 mb-10">Wadah pengembangan bakat dan minat siswa di luar jam pelajaran.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {extracurriculars.map((ex) => (
                            <div key={ex.id} className="bg-white p-6 rounded-lg shadow text-center hover:bg-primary hover:text-white transition-colors group cursor-pointer">
                                <div className="mb-3 text-primary group-hover:text-white inline-block">
                                    {ex.icon}
                                </div>
                                <h4 className="font-semibold">{ex.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
        </React.Fragment>
    );
};

export default Programs;
