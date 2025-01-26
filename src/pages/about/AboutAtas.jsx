import React from 'react';
import { useState, useRef } from 'react';

const AboutSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const imageRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        imageRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section
            className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 lg:-mt-2"
            onMouseMove={handleMouseMove}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column - About Content */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <span className="inline-block px-4 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                                Est. 2018
                            </span>
                            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                                DUA BERSAUDARA DENGAN KAMERA
                            </h2>
                        </div>

                        <div className="prose prose-lg text-gray-500">
                            <p className="text-lg border-l-4 border-gray-200 pl-4 italic">
                                Passion dan kenekatan skill fotografi, itulah cerita bagaimana JIBO bisa lahir
                            </p>

                            <p className="mt-6">
                                Selamat datang di <span className="font-semibold text-gray-900">JIBOUNLIMITED</span>.
                                Kami bergerak di bidang fotografi, dibangun oleh dua bersaudara ET, JIBO, dan suhu kami HEN.
                                Perjalanan kami berawal dari kesenangan mendokumentasikan momen berharga, hingga akhirnya
                                terjun ke dunia wedding serta graduation dan poto poto dokumentasi.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                Layanan Spesialis Kami
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    'PHOTO WEDDING',
                                    'PHOTO PREWEDDING',
                                    'PHOTO STUDIO',
                                    'PHOTO MATERNITY',
                                    'PHOTO GRADUATION',
                                    'PHOTO CATALOG PRODUK'
                                ].map((service, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-3 text-gray-600"
                                    >
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                        <span className="text-sm font-medium">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl">
                            <p className="text-gray-600">
                                Kami juga melebarkan sayap di bidang crafting dengan divisi khusus kami:
                            </p>
                            <p className="text-2xl font-bold text-gray-800 text-center mt-4">
                                JIBOCRAFT
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="lg:sticky lg:top-8 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-gray-900">
                                Find out the price of your home
                            </h3>
                            <p className="text-xl text-gray-600">
                                We will contact you within 24 hours
                            </p>
                        </div>

                        <form className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100">
                            <div className="space-y-6">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-b border-gray-200 focus:border-gray-900 bg-transparent outline-none transition-colors duration-200"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-b border-gray-200 focus:border-gray-900 bg-transparent outline-none transition-colors duration-200"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-b border-gray-200 focus:border-gray-900 bg-transparent outline-none transition-colors duration-200"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white py-4 px-8 rounded-xl hover:bg-gray-800 transition-colors duration-200"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;