import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../assets/jibo-logo.png";
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
                    <a href="tel:+88 333 78 901" className="block">
                        1092018308
                    </a>
                    <a href="mailto:z8xH3@example.com" className="block">
                        Lorem, ipsum.@gmail.com
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
                    <FaFacebookF
                        className="cursor-pointer hover:text-firstcolor duration-300 text-2xl"
                    />
                    <FaInstagram
                        className="cursor-pointer hover:text-firstcolor duration-300 text-2xl"
                    />
                    <FaTwitter
                        className="cursor-pointer hover:text-firstcolor duration-300 text-2xl"
                    />
                </motion.div>
            </motion.div>

            {/* Copyright */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 3.5 }}
            >
                <p className="text-whitecolor text-xs text-center mt-10 opacity-50">
                    Copyright &copy; 2024 jibo. All rights reserved.
                </p>
            </motion.div>
        </div>
    );
};

export default Footer;
