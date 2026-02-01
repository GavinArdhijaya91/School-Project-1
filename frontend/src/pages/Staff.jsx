import React from 'react';

const Staff = () => {
    // Dummy data for staff
    const staff = [
        { id: 1, name: 'Drs. H. Ahmad Fauzi', role: 'Kepala Sekolah', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Siti Aminah, S.Pd', role: 'Wakil Kurikulum', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Budi Santoso, M.Kom', role: 'Guru TIK', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Ratna Dewi, S.Mat', role: 'Guru Matematika', image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Agus Wijaya, S.Or', role: 'Guru Olahraga', image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Dewi Lestari, S.Ing', role: 'Guru Bahasa Inggris', image: 'https://via.placeholder.com/150' },
        { id: 7, name: 'Eko Prasetyo, S.Pd', role: 'Guru Fisika', image: 'https://via.placeholder.com/150' },
        { id: 8, name: 'Rina Sari, S.Psi', role: 'Guru BK', image: 'https://via.placeholder.com/150' },
    ];

    return (
        <React.Fragment>
        <div className="py-12 bg-white min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="section-title">Staf Pengajar</h1>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Berkenalan dengan tenaga pendidik profesional yang berdedikasi untuk membimbing siswa-siswi kami mencapai potensi terbaik mereka.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {staff.map((person) => (
                        <div key={person.id} className="text-center group">
                            <div className="relative mb-4 inline-block overflow-hidden rounded-full border-4 border-gray-100 w-40 h-40">
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                    {/* Placeholder for real image */}
                                    User
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-primary-dark group-hover:text-primary transition-colors">{person.name}</h3>
                            <p className="text-gray-500">{person.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </React.Fragment>
    );
};

export default Staff;
