import React from 'react';
import { motion } from 'framer-motion';
import { ImGift } from "react-icons/im";
import { BsBox2Heart } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { TfiGift } from "react-icons/tfi";
import { BsEnvelopePaperHeart } from "react-icons/bs";
import jiboCraft from '../../assets/craft.png';
// Import gallery images
import gallery1 from '../../assets/jibocraft1.jpeg';
import gallery2 from '../../assets/jibocraft2.jpeg';
import gallery3 from '../../assets/jibocraft3.jpeg';
import gallery4 from '../../assets/jibocraft4.jpeg';
import gallery5 from '../../assets/jibocraft5.jpeg';
import gallery6 from '../../assets/jibocraft6.jpeg';

const Company = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
            },
        },
    };

    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const services = [
        {
            icon: <ImGift />,
            title: "Wedding Dowry",
            description: "Crafting beautiful and meaningful wedding dowry arrangements that symbolize the union of two souls."
        },
        {
            icon: <BsBox2Heart />,
            title: "Seserahan Box",
            description: "Elegant gift boxes for traditional Indonesian wedding ceremonies, designed with love and attention to detail."
        },
        {
            icon: <BsEnvelopePaperHeart />,
            title: "Wedding Invitations",
            description: "Custom-designed wedding invitations that capture the essence of your special day."
        },
        {
            icon: <TfiGift />,
            title: "Custom Gifts",
            description: "Personalized gift solutions for all occasions, crafted with care and creativity."
        },
        {
            icon: <IoNewspaperOutline />,
            title: "Advertising Materials",
            description: "Creative design solutions for your business promotional needs."
        }
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
        <motion.section
            className="bg-white py-8 px-4 sm:py-16 sm:px-6 lg:px-8 min-h-screen w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
                    {/* Left Column - About */}
                    <motion.div variants={fadeInUpVariants} className="space-y-8 w-full">
                        <div className="w-full">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">JIBO CRAFT</h2>
                            <div className="w-20 h-1 bg-gray-400 mb-8"></div>
                            <div className="flex justify-center mb-6 w-full">
                                <img 
                                    src={jiboCraft} 
                                    alt="JIBO CRAFT Logo" 
                                    className="w-36 sm:w-52 h-auto object-contain" 
                                />
                            </div>
                            <div className="prose prose-sm sm:prose-lg text-gray-600 space-y-4 sm:space-y-6 w-full">
                                <p>
                                    Welcome to the crafting division of JIBO UNLIMITED. At JIBO CRAFT, we merge traditional 
                                    craftsmanship with contemporary design to create unique pieces that tell your story.
                                </p>
                                <p>
                                    Our journey in the crafting industry began as an extension of our photography services, 
                                    where we recognized the need for beautifully crafted wedding accessories and gifts. Today, 
                                    we've grown into a full-service craft studio, specializing in wedding dowry, custom gifts, 
                                    and promotional materials.
                                </p>
                                <p>
                                    Each piece we create is handcrafted with attention to detail and a commitment to quality, 
                                    ensuring that every item perfectly captures the significance of your special moments.
                                </p>
                                <p>    
                                    If you have any 
                                    questions, need a custom design, or simply want to explore more of our handcrafted collections, feel free 
                                    to reach out to us via 
                                    <motion.span className="relative inline-block mx-1">
                                        <motion.span
                                            className="absolute inset-0 bg-white px-2 py-0.5 rounded-lg shadow-md"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 1.2, ease: "easeOut" }}
                                            style={{ originX: 0 }}
                                        ></motion.span>
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
                                            transition={{ duration: 1.2, ease: "easeOut" }}
                                            style={{ originX: 0 }}
                                        ></motion.span>
                                        <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="relative z-10 font-bold text-gray-900">
                                            Instagram
                                        </a>
                                    </motion.span>. We'd love to connect with you!
                                </p>
                            </div>
                        </div>        
                    </motion.div>

                    {/* Right Column - Services */}
                    <motion.div variants={fadeInUpVariants} className="space-y-4 sm:space-y-8 w-full">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUpVariants}
                                className="bg-gray-50 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 w-full"
                            >
                                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                                    <div className="text-2xl sm:text-4xl text-gray-600 flex-shrink-0">
                                        {service.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-600">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom Decorative Element */}
                <div className="mt-16 sm:mt-24 flex justify-center">
                    <div className="w-16 h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
                </div>

                {/* Gallery Section */}
                <motion.div variants={fadeInUpVariants} className="mt-12 sm:mt-20 w-full">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                        Our Latest Works
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUpVariants}
                                className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg shadow-lg group w-full"
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
            </div>
        </motion.section>
    );
};

export default Company;