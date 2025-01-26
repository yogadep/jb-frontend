import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import { useCreatePostMutation } from "../../../redux/features/post/postApi";

const UploadPost = () => {
    const editorRef = useRef(null);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [postBlog] = useCreatePostMutation();
    const { admin } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // Convert plain text to EditorJS blocks format
    const convertTextToBlocks = (text) => {
        const paragraphs = text.split('\n\n');
        return paragraphs.map((paragraph, index) => ({
            id: `block-${index}`,
            type: 'paragraph',
            data: {
                text: paragraph.replace(/\n/g, '<br>')
            }
        }));
    };

    useEffect(() => {
        if (!admin) {
            navigate('/login');
            return;
        }

        // Initialize Editor
        const editor = new EditorJS({
            holder: 'editorjs',
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
                blocks: [
                    {
                        id: 'initial-block',
                        type: 'paragraph',
                        data: {
                            text: ''
                        }
                    }
                ],
                version: "2.30.7"
            },
            placeholder: 'Start writing your post...'
        });

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [admin, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrorMessage('Image size should be less than 5MB');
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
            if (!title.trim()) {
                throw new Error('Title is required');
            }

            if (!editorRef.current) {
                throw new Error('Editor is not ready yet');
            }

            if (!image) {
                throw new Error('Image is required');
            }

            const editorData = await editorRef.current.save();

            // Ensure content is in the correct format
            if (editorData.blocks.length === 0) {
                throw new Error('Content cannot be empty');
            }

            // Convert the blocks to plain text for storage
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
            formData.append('title', title.trim());
            formData.append('content', plainText);
            formData.append('image', image);

            // Log FormData untuk debugging
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ', pair[1]);
            }

            const response = await postBlog(formData).unwrap();
            console.log('Response from server:', response);

            alert('Post created successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error full details:', error);
            setErrorMessage(
                error.data?.error?.[0]?.msg ||
                error.data?.error ||
                error.message ||
                'Gagal membuat post. Silakan coba lagi.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-900 md:p-8 p-2 min-h-screen rounded-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-200">Create A New Blog Post</h2>

            {errorMessage && (
                <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-6">
                    <p className="text-red-400">{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <label className="block font-semibold text-lg text-gray-300">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 px-4 py-2 placeholder-gray-500"
                        placeholder="Enter post title..."
                        required
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                        <label className="block font-semibold text-lg mb-4 text-gray-300">Content</label>
                        <div
                            id="editorjs"
                            className="border border-gray-700 bg-gray-800 rounded-lg min-h-[400px] p-4 text-gray-200"
                        />
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
                                    accept="image/*"
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
                    {isSubmitting ? 'Creating Post...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};
export default UploadPost;