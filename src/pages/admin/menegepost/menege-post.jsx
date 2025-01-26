import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import {
    useFetchGetAllPostsQuery,
    useDeletePostMutation,
    useUpdatePostMutation
} from "../../../redux/features/post/postApi";

const PostsManage = () => {
    const navigate = useNavigate();
    const { admin } = useSelector((state) => state.auth);
    const { data: postsData, isLoading: isLoadingPosts, refetch } = useFetchGetAllPostsQuery();
    const [deletePost] = useDeletePostMutation();
    const [updatePost] = useUpdatePostMutation();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [editForm, setEditForm] = useState({
        title: '',
        content: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const editorRef = useRef(null);

    useEffect(() => {
        if (!admin) {
            navigate('/login');
        }
    }, [admin, navigate]);

    useEffect(() => {
        if (isEditModalOpen && editingPost) {
            // Konversi konten ke format blocks EditorJS
            const initialBlocks = editingPost.content ? [{
                id: 'initial-block',
                type: 'paragraph',
                data: {
                    text: editingPost.content
                }
            }] : [];

            const editor = new EditorJS({
                holder: 'edit-editorjs',
                onReady: () => {
                    editorRef.current = editor;
                },
                tools: {
                    header: {
                        class: Header,
                        config: {
                            levels: [1, 2, 3],
                            defaultLevel: 1
                        }
                    },
                    list: {
                        class: List,
                        inlineToolbar: true
                    }
                },
                data: {
                    time: new Date().getTime(),
                    blocks: initialBlocks,
                    version: "2.30.7"
                },
                placeholder: 'Mulai menulis post Anda...'
            });

            return () => {
                if (editorRef.current) {
                    editorRef.current.destroy();
                    editorRef.current = null;
                }
            };
        }
    }, [isEditModalOpen, editingPost]);

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus post ini?')) {
            try {
                await deletePost(id).unwrap();
                alert('Post berhasil dihapus');
                refetch();
            } catch (error) {
                console.error('Error menghapus post:', error);
                setMessage('Gagal menghapus post');
            }
        }
    };

    const openEditModal = (post) => {
        setEditingPost(post);
        setEditForm({
            title: post.title,
            content: post.content,
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
                setMessage('Ukuran gambar harus kurang dari 5MB');
                return;
            }
            setEditForm(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
            setMessage('');
        }
    };

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/300?text=Tidak+Ada+Gambar';
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            if (!editForm.title.trim()) {
                throw new Error('Judul diperlukan');
            }

            if (!editorRef.current) {
                throw new Error('Editor belum siap');
            }

            const editorData = await editorRef.current.save();
            const plainText = editorData.blocks
                .map(block => {
                    switch (block.type) {
                        case 'paragraph':
                            return block.data.text.replace(/<br>/g, '\n');
                        case 'header':
                            return `${block.data.text}\n`;
                        case 'list':
                            return block.data.items.join('\n');
                        default:
                            return block.data.text || '';
                    }
                })
                .join('\n\n');

            const formData = new FormData();
            formData.append('title', editForm.title.trim());
            formData.append('content', plainText);

            if (editForm.image) {
                formData.append('image', editForm.image);
            }

            await updatePost({
                id: editingPost._id,
                updatedPost: formData
            }).unwrap();

            alert('Post berhasil diperbarui');
            setIsEditModalOpen(false);
            refetch();
        } catch (error) {
            console.error('Error memperbarui post:', error);
            setMessage(
                error.data?.error?.[0]?.msg ||
                error.data?.error ||
                error.message ||
                'Gagal memperbarui post'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoadingPosts) {
        return <div className="bg-gray-900 text-gray-200 text-center p-8">Loading posts...</div>;
    }

    return (
        <div className="bg-gray-900 md:p-8 p-2 min-h-screen rounded-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-200">Manage Posts</h2>
                <button
                    onClick={() => navigate('/dashboard/upload-post')}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg transition duration-200"
                >
                    Tambah Post Baru
                </button>
            </div>

            {message && (
                <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-6">
                    <p className="text-red-400">{message}</p>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-700">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="border border-gray-700 px-4 py-2 text-gray-200">No</th>
                            <th className="border border-gray-700 px-4 py-2 text-gray-200">Judul</th>
                            <th className="border border-gray-700 px-4 py-2 text-gray-200">Gambar</th>
                            <th className="border border-gray-700 px-4 py-2 text-gray-200">Tanggal Dibuat</th>
                            <th className="border border-gray-700 px-4 py-2 text-gray-200">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postsData?.posts
                            ?.slice()
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((post, index) => (
                                <tr key={post._id} className="bg-gray-800/50">
                                    <td className="border border-gray-700 px-4 py-2 text-center text-gray-300">{index + 1}</td>
                                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{post.title}</td>
                                    <td className="border border-gray-700 px-4 py-2 text-center">
                                        <img
                                            src={post.image || 'https://via.placeholder.com/300?text=Tidak+Ada+Gambar'}
                                            alt={post.title || 'Cover Artikel'}
                                            onError={handleImageError}
                                            className="w-20 h-20 object-cover mx-auto rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-700 px-4 py-2 text-center text-gray-300">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-700 px-4 py-2 text-center">
                                        <button
                                            onClick={() => openEditModal(post)}
                                            className="bg-gray-600 hover:bg-gray-500 text-gray-200 px-3 py-1 rounded mr-2 transition duration-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post._id)}
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

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-gray-900 rounded-lg p-6 max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto border border-gray-700">
                        <h3 className="text-xl font-semibold mb-4 text-gray-200">Edit Post</h3>
                        {message && (
                            <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-4">
                                <p className="text-red-400">{message}</p>
                            </div>
                        )}
                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div>
                                <label className="block font-semibold text-lg text-gray-300">Title</label>
                                <input
                                    type="text"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 px-4 py-2 placeholder-gray-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-lg text-gray-300">Content</label>
                                <div
                                    id="edit-editorjs"
                                    className="border border-gray-700 bg-gray-800 rounded-lg p-4 text-gray-200 min-h-[200px]"
                                />
                            </div>
                            <div className="p-6">
                                <label className="font-semibold text-lg mb-4 text-gray-300 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Image
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
                                ) : editingPost?.image && (
                                    <div className="mt-4">
                                        <img
                                            src={editingPost.image || 'https://via.placeholder.com/300?text=Tidak+Ada+Gambar'}
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

export default PostsManage;