import React from 'react';
import { useFetchGetAllProductsQuery } from '../../redux/features/product/productApi';
import { motion } from 'framer-motion';

const AllProduct = () => {
    const { data: response, error, isLoading } = useFetchGetAllProductsQuery();
    const products = [...(response?.data || response?.products || [])]
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
                <motion.div className="product__top flex flex-col items-center text-center gap-3 mb-10"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl font-bold text-white">Our Catalogs</h2>
                </motion.div>

                {isLoading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <div className="text-red-500 text-center mt-16">
                        {error?.data?.message || 'Error occurred. Please try again later.'}
                    </div>
                ) : !Array.isArray(products) || products.length === 0 ? (
                    <div className="text-white text-center mt-16">
                        No products available
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-20 mt-16">
                        {products.map((product, index) => (
                            <div
                                key={product.id || index}
                                className={`flex flex-col lg:flex-row ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10`}
                            >
                                {/* Image Section */}
                                <motion.div
                                    className="w-full lg:w-2/3"
                                    initial={{ opacity: 0, x: -300 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 2 }}
                                >
                                    <div className="rounded-[2rem] overflow-hidden">
                                        <img
                                            src={product?.image || 'https://via.placeholder.com/800x600?text=No+Image'}
                                            alt={product?.name || 'Product Image'}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
                                            }}
                                            className="w-full h-[300px] lg:h-[500px] object-cover transition-transform duration-700 hover:scale-110"
                                        />
                                    </div>
                                </motion.div>

                                {/* Text Section */}
                                <motion.div
                                    className="w-full lg:w-2/4 space-y-6 text-center lg:text-center"
                                    initial={{ opacity: 0, x: 300 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 2 }}
                                >
                                    {/* <h3 className="text-3xl font-bold text-white sm:mb-0">
                                        {product.name || 'Unnamed Product'}
                                    </h3>
                                    <p className="text-gray-300 text-lg font-semibold leading-relaxed">
                                        {product.description || 'No description available'}
                                    </p> */}
                                </motion.div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllProduct;