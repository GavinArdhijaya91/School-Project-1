import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit2, Trash2, Search, X, User } from 'lucide-react';

const StaffManagement = () => {
    const { token } = useAuth();
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        subject: '',
        image: ''
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/staff');
            const data = await response.json();
            if (data.success) {
                setStaff(data.data);
            }
        } catch (error) {
            console.error('Error fetching staff:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingStaff
            ? `http://localhost:5000/api/staff/${editingStaff.id}`
            : 'http://localhost:5000/api/staff';
        const method = editingStaff ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                fetchStaff();
                closeModal();
            }
        } catch (error) {
            console.error('Error saving staff:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin ingin menghapus staff ini?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/staff/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                fetchStaff();
            }
        } catch (error) {
            console.error('Error deleting staff:', error);
        }
    };

    const openModal = (staffMember = null) => {
        if (staffMember) {
            setEditingStaff(staffMember);
            setFormData(staffMember);
        } else {
            setEditingStaff(null);
            setFormData({
                name: '',
                position: '',
                subject: '',
                image: ''
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingStaff(null);
    };

    const filteredStaff = staff.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.subject && s.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Kelola Staff Pengajar</h1>
                            <p className="text-gray-600 mt-1">Tambah, edit, atau hapus data staff pengajar</p>
                        </div>
                        <button
                            onClick={() => openModal()}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all"
                        >
                            <Plus className="h-5 w-5" />
                            Tambah Staff
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari staff..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    {/* Staff Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStaff.map((staffMember) => (
                            <div key={staffMember.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
                                <div className="flex flex-col items-center text-center">
                                    {staffMember.image ? (
                                        <img
                                            src={staffMember.image}
                                            alt={staffMember.name}
                                            className="w-24 h-24 rounded-full object-cover mb-4"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                            <User className="h-12 w-12 text-gray-400" />
                                        </div>
                                    )}
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{staffMember.name}</h3>
                                    <p className="text-sm text-primary font-medium mb-1">{staffMember.position}</p>
                                    {staffMember.subject && (
                                        <p className="text-sm text-gray-500 mb-4">{staffMember.subject}</p>
                                    )}
                                    <div className="flex gap-2 mt-auto">
                                        <button
                                            onClick={() => openModal(staffMember)}
                                            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-all"
                                        >
                                            <Edit2 className="h-3 w-3" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(staffMember.id)}
                                            className="flex items-center gap-1 px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-all"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                                    {editingStaff ? 'Edit Staff' : 'Tambah Staff'}
                                </h2>
                                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                                    <input
                                        type="text"
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        placeholder="Contoh: Kepala Sekolah, Wakil Kurikulum"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran (Opsional)</label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        placeholder="Contoh: Matematika, Bahasa Indonesia"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Foto</label>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all"
                                    >
                                        {editingStaff ? 'Update' : 'Tambah'}
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

export default StaffManagement;
