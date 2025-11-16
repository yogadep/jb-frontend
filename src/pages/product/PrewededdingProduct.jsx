import React from 'react';
import { useFetchGetAllProductsQuery } from '../../redux/features/product/productApi';
import { motion } from 'framer-motion';

const PrewededdingProduct = () => {
    const { data: response, error, isLoading } = useFetchGetAllProductsQuery();
    const products = [...(response?.data || response?.products || [])]
        .filter(product => product.category === 'prewededding')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const LoadingSkeleton = () => (
        <div className="space-y-8">
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="relative flex w-full max-w-[90rem] mx-auto h-[500px] rounded-3xl bg-gray-700 animate-pulse"
                />
            ))}
        </div>
    );

    return (
        <section className="bg-[#120d0d] relative overflow-hidden py-5 px-6">
            <div className="container mx-auto max-w-[90rem]">
                <motion.div
                    className="product__top flex flex-col items-center text-center gap-3 mb-10"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl font-bold text-white">Prewededding Photography</h2>
                </motion.div>

                {isLoading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <div className="text-red-500 text-center mt-16">
                        {error?.data?.message || 'Error occurred. Please try again later.'}
                    </div>
                ) : !Array.isArray(products) || products.length === 0 ? (
                    <div className="text-white text-center mt-16">
                        No Product Available
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
                        {products.map((product, index) => (
                            <motion.div 
                                key={product.id || index}
                                className="w-full rounded-[2rem] overflow-hidden"   // ✅ FIX: bikin card rapi full width
                                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <img
                                    src={product?.image || '/api/placeholder/800/600'}
                                    alt={product?.name || 'Studio Photography'}
                                    onError={(e) => {
                                        e.target.src = '/api/placeholder/800/600';
                                    }}

                                    // 🔥 DIUBAH: height konsisten → biar semua gambar sama panjang
                                    className="w-full h-[260px] md:h-[320px] lg:h-[380px] 
                                               object-cover transition-transform duration-700 hover:scale-110"
                                />

                            </motion.div>

                        ))}              
                    </div>  
                )}
            </div>
        </section>
    );
};

export default PrewededdingProduct;