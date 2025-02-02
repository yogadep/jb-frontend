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

const Company = () => {
    const services = [
        {
            icon: <ImGift />, title: "Wedding Dowry", description: "Crafting beautiful and meaningful wedding dowry arrangements that symbolize the union of two souls."
        },
        {
            icon: <BsBox2Heart />, title: "Seserahan Box", description: "Elegant gift boxes for traditional Indonesian wedding ceremonies, designed with love and attention to detail."
        },
        {
            icon: <BsEnvelopePaperHeart />, title: "Wedding Invitations", description: "Custom-designed wedding invitations that capture the essence of your special day."
        },
        {
            icon: <TfiGift />, title: "Custom Gifts", description: "Personalized gift solutions for all occasions, crafted with care and creativity."
        },
        // {
        //     icon: <IoNewspaperOutline />, title: "Advertising Materials", description: "Creative design solutions for your business promotional needs."
        // }
    ];

    const galleryImages = [
        { src: gallery1, alt: 'Wedding Dowry' },
        { src: gallery2, alt: 'Seserahan Box' },
        { src: gallery3, alt: 'Wedding Invitation' },
        { src: gallery4, alt: 'Custom Gift' },
        { src: gallery5, alt: 'Advertising Material' },
        { src: gallery6, alt: 'Craft Work' }
    ];

    return (
        <section className="relative min-h-screen bg-white py-20 px-4 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        {/* <h2 className="text-4xl font-bold text-gray-900 mb-6">JIBO CRAFT</h2>
                        <div className="w-20 h-1 bg-gray-400 mb-8"></div> */}
                        <div className="flex justify-center mb-6">
                            <img src={jiboCraft} alt="JIBO CRAFT Logo" className="w-52 h-auto object-contain" />
                        </div>
                        <div className="text-gray-600 space-y-6">
                            <motion.p initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                                Welcome to the crafting division of JIBO UNLIMITED. At JIBO CRAFT, we merge traditional 
                                craftsmanship with contemporary design to create unique pieces that tell your story.
                            </motion.p>
                            <motion.p initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                                Our journey in the crafting industry began as an extension of our photography services, 
                                where we recognized the need for beautifully crafted wedding accessories and gifts. Today, 
                                we've grown into a full-service craft studio, specializing in wedding dowry, custom gifts, 
                                and promotional materials.
                            </motion.p>
                            <motion.p initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                                Each piece we create is handcrafted with attention to detail and a commitment to quality, 
                                ensuring that every item perfectly captures the significance of your special moments.
                            </motion.p>
                            <p>    
                                If you have any questions, need a custom design, or simply want to explore more of our handcrafted collections, feel free to reach out to us via 
                                <motion.span className="relative inline-block mx-1">
                                    <motion.span 
                                        className="absolute inset-0 bg-white px-2 py-0.5 rounded-lg shadow-md"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        style={{ originX: 0 }}
                                    />
                                    <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" className="relative z-10 font-bold text-gray-900">
                                        WhatsApp
                                    </a>
                                </motion.span> 
                                or stay updated with our latest creations by following us on 
                                <motion.span className="relative inline-block mx-1">
                                    <motion.span 
                                        className="absolute inset-0 bg-white px-2 py-0.5 rounded-lg shadow-md"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}  // Delay biar muncul setelah WA
                                        style={{ originX: 0 }}
                                    />
                                    <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="relative z-10 font-bold text-gray-900">
                                        Instagram
                                    </a>
                                </motion.span>. We’d love to connect with you!
                            </p>
                        </div>
                    </motion.div>
                    
                    <motion.div className="space-y-6" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        {services.map((service, index) => (
                            <motion.div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300" whileHover={{ scale: 1.05 }}>
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl text-gray-600 flex-shrink-0">{service.icon}</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                        <p className="text-gray-600">{service.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                <motion.div className="mt-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Latest Works</h3>
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {galleryImages.map((image, index) => (
                            <motion.div key={index} className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg shadow-lg group" whileHover={{ scale: 1.05 }}>
                                <img src={image.src} alt={image.alt} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Company;
