import React from 'react';
import { useFetchGetAllPostsQuery } from '../../redux/features/post/postApi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Posts = () => {
    const { data, error, isLoading } = useFetchGetAllPostsQuery();
    const posts = data?.posts?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [];
    console.log('Data posts:', posts); // Untuk debugging

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 gap-10 mt-16 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                    key={item}
                    className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800"
                >
                    <div className="w-full h-72 bg-gray-700 animate-pulse"></div>
                    <div className="p-6 space-y-3">
                        <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <section
            className="bg-[#120d0d] relative overflow-hidden py-20 px-6 pt-0 sm:pt-2"
        >
            <div
                className="border-x border-[#5a5a5a] w-4/5 h-full absolute top-0 left-1/2 transform -translate-x-1/2 opacity-20 lg:w-1/2 xl:w-1/3 pointer-events-none"
            />
            <div
                className="border-l border-[#5a5a5a] w-full h-full absolute top-0 transform translate-x-1/2 opacity-20 pointer-events-none"
            />

            <div className="container mx-auto">
                <motion.div
                    className="post__top flex flex-col items-center text-center gap-3 xl:gap-5"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2
                        className="text-4xl font-extrabold text-white sm:text-2xl"
                    >

                        Our creations & <br />
                        Find Your Inspiration
                    </h2>
                </motion.div>

                {isLoading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <div
                        className="text-red-500 text-center mt-16"
                    >
                        {error?.data?.message || 'Terjadi kesalahan. Silakan coba lagi nanti.'}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-16">
                        {posts.map((post) => (
                            <motion.div
                                key={post._id}
                                className="post__item relative overflow-hidden rounded-lg shadow-lg hover:-translate-y-2 transition-transform"
                                initial={{ opacity: 0, y: 200 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <img
                                    src={post?.image || 'https://via.placeholder.com/300?text=Tidak+Ada+Gambar'}
                                    alt={post?.title || 'Cover Artikel'}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300?text=Tidak+Ada+Gambar';
                                    }}
                                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <h2 className="text-xs sm:text-sm text-gray-800 font-light hover:translate-x-2 transition-transform duration-300">
                                        {new Date(post.createdAt).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </h2>
                                    <Link to={`/posts/${post._id}`}>
                                        <h4 className="mt-2 text-lg sm:text-lg font-semibold text-white hover:text-gray-400 hover:translate-x-2 transition-all duration-300">
                                            {post.title || 'Artikel Tanpa Judul'}
                                        </h4>
                                    </Link>
                                    <p className="mt-2 text-xs sm:text-sm text-gray-300 line-clamp-3 sm:line-clamp-2 hover:translate-x-2 transition-transform duration-300">
                                        {post?.content?.slice(0, 100) || 'Belum ada konten untuk artikel ini.'}...
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Posts;