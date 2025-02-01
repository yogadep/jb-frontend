import React from "react";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/jibo.jpg";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <div className="py-8 md:py-10 bg-blackcolor">
            <motion.div
                className="text-whitecolor flex flex-col items-center justify-center gap-8 text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}>
                {/* Logo */}
                <img
                    src={logo}
                    alt="logo"
                    className="w-52"
                />
                {/* Kontak */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2 }}>
                    <a href="tel:+6285810007180" className="block">
                        0858-1000-7180
                    </a>
                    <a href="mailto:jibounlimited@gmail.com" className="block">
                        jibounlimited@gmail.com
                    </a>
                </motion.div>
                {/* Garis Pemisah */}
                <span
                    className="border-b w-40 opacity-50"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2.5 }}>
                </span>

                {/* Ikon Sosial Media */}
                <motion.div
                    className="text-gray-200 space-x-5 flex justify-center items-center"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 3 }}>
                        <a href="mailto:jibounlimited@gmail.com" className="flex items-center gap-2">
                            <FaEnvelope className="cursor-pointer hover:text-firstcolor duration-300 text-2xl" />
                        </a>
                        <a href="https://www.instagram.com/jibounlimited/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="cursor-pointer hover:text-firstcolor duration-300 text-2xl" />
                        </a>
                        <a href="https://api.whatsapp.com/send?phone=6285810007180&text=Assalammualaikum%20JIBO%20HQ%20Mau%20Tanya%20Pricelist%20Kak%20Matursuwun&fbclid=PAZXh0bgNhZW0CMTEAAabryvcoqeCnCcQ87vd481BeReU_a87dKDAktmbsfz8dABF6wfX22dVmimM_aem_A-N__spNH158qE5B5Hdk0Q" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp className="cursor-pointer hover:text-firstcolor duration-300 text-2xl" />
                        </a>
                        <a href="https://maps.app.goo.gl/ePz93wgHkY6dPWzc9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <FaMapMarkerAlt className="cursor-pointer hover:text-firstcolor duration-300 text-2xl" />
                        </a>
                </motion.div>
            </motion.div>

            {/* Copyright */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 3.5 }}
            >
                <p className="text-whitecolor text-xs text-center mt-10 opacity-50">
                    Copyright &copy; 2025 Jibo Unlimited. All rights reserved.
                </p>
            </motion.div>
        </div>
    );
};

export default Footer;
