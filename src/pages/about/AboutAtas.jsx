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
        <section className="relative min-h-screen bg-white py-20 px-4 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            
            <div className="max-w-6xl mx-auto">
                {/* Header Section with Visual Interest */}
                <div className="relative mb-24">
                    <span className="inline-block text-sm text-gray-500 tracking-widest mb-4">
                        SINCE 2018
                    </span>
                    <div className="relative">
                        <div className="absolute -left-4 top-1/2 w-16 h-16 bg-gray-50 rounded-full transform -translate-y-1/2"></div>
                        <div className="relative z-10">
                            <div className="text-6xl font-bold text-gray-900 leading-tight max-w-3xl">
                                Two Brothers With A Camera
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content with Dynamic Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div className="relative">
                            <div className="text-xl text-gray-600 italic leading-relaxed pl-6 border-l-2 border-gray-200">
                                Passion and determination in photography skills, 
                                that's the story of how JIBO was born
                            </div>
                        </div>

                        <div className="text-gray-600 leading-relaxed space-y-6">
                            <p>
                                Welcome to <span className="font-semibold text-black">JIBO UNLIMITED</span>. 
                                We are in the field of photography, founded by two brothers, ET, NY, 
                                and our mentor HEN.
                            </p>
                            <p>
                                Our journey started from the joy of documenting precious moments, 
                                which eventually led us into the world of weddings, graduations, 
                                and photo documentation.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -right-20 top-10 w-40 h-40 bg-gray-50 rounded-full"></div>
                        <div className="relative z-10">
                            <div className="bg-white shadow-lg rounded-2xl p-10 hover:shadow-xl transition-shadow">
                                <div className="space-y-6">
                                    <div className="text-lg text-gray-600 text-center">
                                        We're also expanding our wings in crafting 
                                        with our special division
                                    </div>
                                    <div className="relative">
                                        <div className="text-center">
                                            <div className="inline-block relative">
                                                <span className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                                    JIBOCRAFT
                                                </span>
                                                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gray-800 to-gray-600"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Decorative Element */}
                <div className="mt-24 flex justify-center">
                    <div className="w-16 h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;