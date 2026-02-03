import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit2, Trash2, X, BookOpen, Trophy } from 'lucide-react';

const ProgramManagement = () => {
    const { token } = useAuth();
    const [programs, setPrograms] = useState({ academic: [], extracurricular: [] });
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProgram, setEditingProgram] = useState(null);
    const [programType, setProgramType] = useState('academic');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: ''
    });

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/programs');
            const data = await response.json();
            if (data.success) {
                setPrograms(data.data);
            }
        } catch (error) {
            console.error('Error fetching programs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingProgram
            ? `http://localhost:5000/api/programs/${editingProgram.id}`
            : 'http://localhost:5000/api/programs';
        const method = editingProgram ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...formData, type: programType })
            });

            const data = await response.json();
            if (data.success) {
                fetchPrograms();
                closeModal();
            }
        } catch (error) {
            console.error('Error saving program:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin ingin menghapus program ini?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/programs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                fetchPrograms();
            }
        } catch (error) {
            console.error('Error deleting program:', error);
        }
    };

    const openModal = (program = null, type = 'akademik') => {
        if (program) {
            setEditingProgram(program);
            setFormData(program);
            setProgramType(type);
        } else {
            setEditingProgram(null);
            setFormData({
                name: '',
                description: '',
                icon: ''
            });
            setProgramType(type);
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProgram(null);
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

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Kelola Program</h1>
                        <p className="text-gray-600 mt-1">Tambah, edit, atau hapus program akademik dan ekstrakurikuler</p>
                    </div>

                    {/* Academic Programs */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-6 w-6 text-primary" />
                                <h2 className="text-xl font-bold text-gray-900">Program Akademik</h2>
                            </div>
                            <button
                                onClick={() => openModal(null, 'akademik')}
                                className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all text-sm"
                            >
                                <Plus className="h-4 w-4" />
                                Tambah
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {programs.academic.map((program) => (
                                <div key={program.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-1">{program.name}</h3>
                                            <p className="text-sm text-gray-600">{program.description}</p>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => openModal(program, 'akademik')}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(program.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Extracurricular Programs */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <Trophy className="h-6 w-6 text-primary" />
                                <h2 className="text-xl font-bold text-gray-900">Program Ekstrakurikuler</h2>
                            </div>
                            <button
                                onClick={() => openModal(null, 'ekstrakurikuler')}
                                className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all text-sm"
                            >
                                <Plus className="h-4 w-4" />
                                Tambah
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {programs.extracurricular.map((program) => (
                                <div key={program.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-1">{program.name}</h3>
                                            <p className="text-sm text-gray-600">{program.description}</p>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => openModal(program, 'ekstrakurikuler')}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(program.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AdminLayout>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">
                                    {editingProgram ? 'Edit Program' : 'Tambah Program'}
                                </h2>
                                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Program</label>
                                    <select
                                        value={programType}
                                        onChange={(e) => setProgramType(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        
                                    >
                                        <option value="akademik">Akademik</option>
                                        <option value="ekstrakurikuler">Ekstrakurikuler</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Program</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        rows="3"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all"
                                    >
                                        {editingProgram ? 'Perbarui' : 'Tambah'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default ProgramManagement;
