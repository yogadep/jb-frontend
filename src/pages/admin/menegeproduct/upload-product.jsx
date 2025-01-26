import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useCreateProductMutation } from "../../../redux/features/product/productApi";

const UploadProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: ''
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createProduct] = useCreateProductMutation();
    const { admin } = useSelector((state) => state.auth);
    const navigate = useNavigate();

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrorMessage('Ukuran gambar harus kurang dari 5MB');
                setImage(null);
                setImagePreview('');
                return;
            }
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                setErrorMessage('Hanya file JPG atau PNG yang diperbolehkan');
                setImage(null);
                setImagePreview('');
                return;
            }
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setErrorMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            if (!image) {
                throw new Error('Gambar produk wajib diupload');
            }

            const formDataToSend = new FormData();
            // Trim all text inputs before sending
            Object.keys(formData).forEach(key => {
                if (formData[key]) {
                    formDataToSend.append(key, formData[key].trim());
                }
            });

            // Explicitly append the image file
            formDataToSend.append('image', image);

            const response = await createProduct(formDataToSend).unwrap();
            console.log('Response from server:', response);

            // Clear form and preview after successful submission
            setFormData({
                name: '',
                category: '',
                description: ''
            });
            setImage(null);
            setImagePreview('');

            alert('Produk berhasil dibuat!');
            navigate('/dashboard/product-manage');
        } catch (error) {
            console.error('Error full details:', error);
            setErrorMessage(
                error.data?.error?.[0]?.msg ||
                error.data?.error ||
                error.message ||
                'Gagal membuat produk. Silakan coba lagi.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Cleanup function for image preview URL
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div className="bg-gray-900 md:p-8 p-2 min-h-screen rounded-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-200">Buat Produk Baru</h2>

            {errorMessage && (
                <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-6">
                    <p className="text-red-400">{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <label className="block font-semibold text-lg text-gray-300">Nama Produk</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 px-4 py-2 placeholder-gray-500"
                        placeholder="Masukkan nama produk..."
                        required
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3 space-y-6">
                        <div>
                            <label className="block font-semibold text-lg text-gray-300">Kategori</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 px-4 py-2 mt-2"
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
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 px-4 py-2 mt-2"
                                rows="8"
                                placeholder="Masukkan deskripsi produk..."
                                required
                            />
                        </div>
                    </div>

                    <div className="md:w-1/3 space-y-8">
                        {/* Featured Image Section */}
                        <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700">
                            <label className="font-semibold text-lg mb-4 text-gray-300 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Upload Image
                            </label>

                            <div className="relative">
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/jpeg,image/png"
                                    className="block w-full text-sm text-gray-400
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-gray-700 file:text-gray-300
                                        hover:file:bg-gray-600
                                        cursor-pointer"
                                    required
                                />
                            </div>

                            {imagePreview && (
                                <div className="mt-4 relative">
                                    <div className="relative group">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-auto rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Author Section */}
                        <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700">
                            <label className="font-semibold text-lg mb-4 text-gray-300 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Author
                            </label>

                            <div className="flex flex-col items-center">
                                <input
                                    type="text"
                                    value={admin ? `${admin.name || admin.username}` : 'Anonymous'}
                                    className="text-center w-auto min-w-[160px] bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 
                                    text-gray-300 font-medium shadow-sm
                                    disabled:bg-gray-700 disabled:text-gray-300"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${isSubmitting
                        ? 'bg-gray-500/50'
                        : 'bg-gray-500 hover:bg-gray-600'
                        } text-white font-medium py-3 rounded-lg transition duration-200`}
                >
                    {isSubmitting ? 'Sedang Membuat Produk...' : 'Buat Produk'}
                </button>
            </form>
        </div>
    );
};

export default UploadProduct;