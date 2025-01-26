import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {
    useFetchGetAllProductsQuery,
    useDeleteProductMutation,
    useUpdateProductMutation
} from "../../../redux/features/product/productApi";

const ProductsManage = () => {
    const navigate = useNavigate();
    const { admin } = useSelector((state) => state.auth);
    const { data: productsData, isLoading: isLoadingProducts, refetch } = useFetchGetAllProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        category: '',
        description: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        'wedding',
        'prewededding',
        'graduation',
        'other',
        'studio',
        'maternity',
        'product'
    ];

    useEffect(() => {
        if (!admin) {
            navigate('/login');
        }
    }, [admin, navigate]);

    const filteredProducts = productsData?.products?.filter(product =>
        selectedCategory === 'all' ? true : product.category === selectedCategory
    );

    const handleImageError = (e) => {
        console.log('Image failed to load:', e.target.src);
        e.target.src = 'https://via.placeholder.com/300?text=Gambar+Tidak+Tersedia';
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            try {
                await deleteProduct(id).unwrap();
                alert('Produk berhasil dihapus');
                refetch();
            } catch (error) {
                console.error('Error:', error);
                setMessage('Gagal menghapus produk');
            }
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setEditForm({
            name: product.name,
            category: product.category,
            description: product.description,
            image: null
        });
        setImagePreview('');
        setIsEditModalOpen(true);
        setMessage('');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setMessage('Ukuran gambar tidak boleh lebih dari 5MB');
                return;
            }
            setEditForm(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
            setMessage('');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            if (!editForm.name.trim()) {
                throw new Error('Nama produk diperlukan');
            }

            const formData = new FormData();
            formData.append('name', editForm.name.trim());
            formData.append('category', editForm.category);
            formData.append('description', editForm.description.trim());

            if (editForm.image) {
                formData.append('image', editForm.image);
            }

            await updateProduct({
                id: editingProduct._id,
                formData: formData
            }).unwrap();

            alert('Produk berhasil diperbarui');
            setIsEditModalOpen(false);
            refetch();
        } catch (error) {
            console.error('Error memperbarui produk:', error);
            setMessage(
                error.data?.error?.[0]?.msg ||
                error.data?.error ||
                error.message ||
                'Gagal memperbarui produk'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    if (isLoadingProducts) {
        return <div className="bg-gray-900 text-gray-200 text-center p-8">Memuat produk...</div>;
    }

    return (
        <div className="bg-gray-900 md:p-8 p-2 min-h-screen rounded-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-200">Manage Produk</h2>
                <button
                    onClick={() => navigate('/dashboard/upload-product')}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg transition duration-200"
                >
                    Tambah Produk Baru
                </button>
            </div>

            <div className="mb-6">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 px-4 py-2"
                >
                    <option value="all">Semua Kategori</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {message && (
                <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-6">
                    <p className="text-red-400">{message}</p>
                </div>
            )}

            {(!filteredProducts || filteredProducts.length === 0) ? (
                <div className="bg-gray-800/50 rounded-lg p-8 text-center">
                    <p className="text-gray-400 text-lg">
                        {selectedCategory === 'all'
                            ? 'Tidak ada produk tersedia'
                            : `Tidak ada produk dalam kategori ${selectedCategory}`
                        }
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-700">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="border border-gray-700 px-4 py-2 text-gray-200">No</th>
                                <th className="border border-gray-700 px-4 py-2 text-gray-200">Nama</th>
                                <th className="border border-gray-700 px-4 py-2 text-gray-200">Gambar</th>
                                <th className="border border-gray-700 px-4 py-2 text-gray-200">Kategori</th>
                                <th className="border border-gray-700 px-4 py-2 text-gray-200">Tanggal Dibuat</th>
                                <th className="border border-gray-700 px-4 py-2 text-gray-200">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts
                                ?.slice()
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .map((product, index) => (
                                    <tr key={product._id} className="bg-gray-800/50">
                                        <td className="border border-gray-700 px-4 py-2 text-center text-gray-300">{index + 1}</td>
                                        <td className="border border-gray-700 px-4 py-2 text-gray-300">{product.name}</td>
                                        <td className="border border-gray-700 px-4 py-2 text-center">
                                            <img
                                                src={product.image || 'https://via.placeholder.com/300?text=Tidak+Ada+Gambar'}
                                                alt={product.name || 'Gambar Produk'}
                                                onError={handleImageError}
                                                className="w-20 h-20 object-cover mx-auto rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-700 px-4 py-2 text-center text-gray-300">{product.category}</td>
                                        <td className="border border-gray-700 px-4 py-2 text-center text-gray-300">
                                            {new Date(product.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-700 px-4 py-2 text-center">
                                            <button
                                                onClick={() => openEditModal(product)}
                                                className="bg-gray-600 hover:bg-gray-500 text-gray-200 px-3 py-1 rounded mr-2 transition duration-200"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="bg-red-600/70 hover:bg-red-500 text-gray-200 px-3 py-1 rounded transition duration-200"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-gray-900 rounded-lg p-6 max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto border border-gray-700">
                        <h3 className="text-xl font-semibold mb-4 text-gray-200">Edit Produk</h3>
                        {message && (
                            <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-4">
                                <p className="text-red-400">{message}</p>
                            </div>
                        )}
                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div>
                                <label className="block font-semibold text-lg text-gray-300">Nama</label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 px-4 py-2 placeholder-gray-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-lg text-gray-300">Kategori</label>
                                <select
                                    value={editForm.category}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 px-4 py-2"
                                    required
                                >
                                    <option value="">Pilih kategori</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold text-lg text-gray-300">Deskripsi</label>
                                <textarea
                                    value={editForm.description}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 px-4 py-2 placeholder-gray-500"
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="p-6">
                                <label className="font-semibold text-lg mb-4 text-gray-300 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Gambar
                                </label>

                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-400
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-gray-700 file:text-gray-300
                                        hover:file:bg-gray-600
                                        cursor-pointer"
                                />

                                {imagePreview ? (
                                    <div className="mt-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="max-h-40 rounded"
                                        />
                                    </div>
                                ) : editingProduct?.image && (
                                    <div className="mt-4">
                                        <img
                                            src={editingProduct.image}
                                            alt="Current"
                                            onError={handleImageError}
                                            className="max-h-40 rounded"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded transition duration-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`${isSubmitting ? 'bg-gray-500/50' : 'bg-gray-500 hover:bg-gray-600'
                                        } text-gray-200 px-4 py-2 rounded transition duration-200`}
                                >
                                    {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsManage;