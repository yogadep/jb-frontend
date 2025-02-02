import React from 'react';
import { motion } from 'framer-motion';
import { ImGift } from "react-icons/im";
import { BsBox2Heart, BsEnvelopePaperHeart } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { TfiGift } from "react-icons/tfi";
import jiboCraft from '../../assets/craft.png';
import gallery1 from '../../assets/jibocraft1.jpeg';
import gallery2 from '../../assets/jibocraft2.jpeg';
import gallery3 from '../../assets/jibocraft3.jpeg';
import gallery4 from '../../assets/jibocraft4.jpeg';
import gallery5 from '../../assets/jibocraft5.jpeg';
import gallery6 from '../../assets/jibocraft6.jpeg';

const services = [
    { icon: <ImGift />, title: "Wedding Dowry", description: "Beautiful and meaningful wedding dowry arrangements." },
    { icon: <BsBox2Heart />, title: "Seserahan Box", description: "Elegant gift boxes for wedding ceremonies." },
    { icon: <BsEnvelopePaperHeart />, title: "Wedding Invitations", description: "Custom wedding invitations with a personal touch." },
    { icon: <TfiGift />, title: "Custom Gifts", description: "Personalized gifts crafted with care and creativity." },
    { icon: <IoNewspaperOutline />, title: "Advertising Materials", description: "Creative promotional design solutions." }
];

const galleryImages = [
    { src: gallery1, alt: 'Wedding Dowry' },
    { src: gallery2, alt: 'Seserahan Box' },
    { src: gallery3, alt: 'Wedding Invitation' },
    { src: gallery4, alt: 'Custom Gift' },
    { src: gallery5, alt: 'Advertising Material' },
    { src: gallery6, alt: 'Craft Work' }
];

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Company = () => {
    return (
        <motion.section
            className="bg-white py-16 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto">
                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 mb-20">
                    {/* Left Column - About */}
                    <motion.div variants={fadeInUpVariants} className="space-y-8">
                        <h2 className="text-4xl font-bold text-gray-900">JIBO CRAFT</h2>
                        <div className="w-20 h-1 bg-gray-400 mb-8"></div>
                        <div className="flex justify-center">
                            <img src={jiboCraft} alt="JIBO CRAFT Logo" className="w-52 h-auto" />
                        </div>
                        <div className="text-gray-600 space-y-6">
                            <p>Welcome to JIBO CRAFT, where traditional craftsmanship meets modern design.</p>
                            <p>Our journey started with photography and expanded into creating handcrafted wedding accessories and gifts.</p>
                            <p>Each piece is made with precision and passion to ensure your special moments are beautifully captured.</p>
                            <p>
                                Connect with us on 
                                <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-900 mx-1">
                                    WhatsApp
                                </a> 
                                or follow us on 
                                <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-900 mx-1">
                                    Instagram
                                </a>.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column - Services */}
                    <motion.div variants={fadeInUpVariants} className="space-y-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUpVariants}
                                className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl text-gray-600">{service.icon}</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                                        <p className="text-gray-600">{service.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Gallery Section */}
                <motion.div variants={fadeInUpVariants} className="mt-20">
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Latest Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUpVariants}
                                className="overflow-hidden rounded-lg shadow-lg group"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom Decorative Element */}
                <div className="mt-24 flex justify-center">
                    <div className="w-16 h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
                </div>
            </div>
        </motion.section>
    );
};

export default Company;
