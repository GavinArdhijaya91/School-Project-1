import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

const GalleryManagement = () => {
    const { token } = useAuth();
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingImage, setEditingImage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        image: ''
    });

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/gallery');
            const data = await response.json();
            if (data.success) {
                setGallery(data.data);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingImage
            ? `http://localhost:5000/api/gallery/${editingImage.id}`
            : 'http://localhost:5000/api/gallery';
        const method = editingImage ? 'PUT' : 'POST';

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
                fetchGallery();
                closeModal();
            }
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin ingin menghapus gambar ini?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/gallery/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                fetchGallery();
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const openModal = (image = null) => {
        if (image) {
            setEditingImage(image);
            setFormData(image);
        } else {
            setEditingImage(null);
            setFormData({
                title: '',
                category: 'kegiatan',
                image: ''
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingImage(null);
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
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Kelola Galeri</h1>
                            <p className="text-gray-600 mt-1">Tambah, edit, atau hapus gambar galeri</p>
                        </div>
                        <button
                            onClick={() => openModal()}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all"
                        >
                            <Plus className="h-5 w-5" />
                            Tambah Gambar
                        </button>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gallery.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                        <ImageIcon className="h-16 w-16 text-gray-400" />
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mb-3">
                                        {item.category}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openModal(item)}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-all"
                                        >
                                            <Edit2 className="h-3 w-3" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-all"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {gallery.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-lg shadow-md">
                            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">Belum ada gambar di galeri</p>
                        </div>
                    )}
                </div>
            </AdminLayout>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">
                                    {editingImage ? 'Edit Gambar' : 'Tambah Gambar'}
                                </h2>
                                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="kegiatan">Kegiatan</option>
                                        <option value="fasilitas">Fasilitas</option>
                                        <option value="prestasi">Prestasi</option>
                                        <option value="event">Event</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        placeholder="https://example.com/image.jpg"
                                        required
                                    />
                                </div>

                                {formData.image && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all"
                                    >
                                        {editingImage ? 'Update' : 'Tambah'}
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

export default GalleryManagement;
