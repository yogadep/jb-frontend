import React from 'react';
import { motion } from 'framer-motion';
import companyBg from '../../assets/index-8.jpg';
import companyImage from '../../assets/company.jpg';
import { ImGift } from "react-icons/im";
import { BsBox2Heart } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { TfiGift } from "react-icons/tfi";
import { BsEnvelopePaperHeart } from "react-icons/bs"

const Company = () => {
    const imageRef = React.useRef(null);

    const handleMouseMove = (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const moveX = (x - 0.5) * 30;
        const moveY = (y - 0.5) * 30;

        if (imageRef.current) {
            imageRef.current.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        }
    };

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

    const leftToRightVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    };

    const rightToLeftVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    };

    return (
        <motion.section
            id="company"
            className="bg-white py-6 md:py-6 lg:py-12 relative overflow-hidden -mt-1 md:p-36 sm:p-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            onMouseMove={handleMouseMove}
        >
            {/* Background Image */}
            <motion.div
                className="hidden xl:block absolute bottom-0 left-1/4 transform -translate-x-1/2 opacity-20"
                variants={rightToLeftVariants}
            >
                <img ref={imageRef} src={companyBg} alt="Background" className="max-w-2xl" />
            </motion.div>

            <div className="flex flex-col items-center gap-14 xl:flex-row xl:items-start xl:justify-between p-2">
                {/* Top Section */}
                <motion.div
                    className="flex flex-col items-center text-center gap-3 xl:text-start xl:items-start xl:max-w-xl z-10 xl:gap-5"
                    variants={leftToRightVariants}
                >
                    <motion.h2
                        className="text-xl md:text-3xl font-bold uppercase text-gray-800"
                        variants={leftToRightVariants}
                    >
                        Jibo Craft
                    </motion.h2>
                    {/* <motion.h4
                        className="text-base text-firstcolor font-bold uppercase"
                        variants={leftToRightVariants}
                    >
                        We deliver the best solutions
                    </motion.h4> */}
                    <motion.div className="mt-5" variants={leftToRightVariants}>
                        <img src={companyImage} alt="Company" className="rounded-md shadow-lg" />
                    </motion.div>

                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    className="flex flex-col items-center lg:justify-between lg:flex-wrap xl:flex-col xl:items-start xl:max-w-md z-10 overflow-hidden lg:ml-32"
                    variants={rightToLeftVariants}
                >
                    {/* Item 1 */}
                    <motion.div className="space-y-2 text-center lg:w-[40%] xl:w-full xl:text-start sm:mb-5" variants={rightToLeftVariants}>
                        <div className="flex flex-col items-center gap-2 xl:flex-row mb-5 sm:mb-0">
                            <h1 className="text-blackcolor xl:text-6xl lg:text-5xl font-semibold sm:mb-0 sm:text-3xl"><ImGift /></h1>
                            <h4 className="text-blackcolor relative before:content-[''] before:bg-firstcolor before:h-1 before:w-5 before:absolute before:-bottom-2 before:left-[35%] pb-1 xl:pb-2 xl:before:left-0 lg:text-1xl xl:text-2xl font-bold">
                                Mahar
                            </h4>
                        </div>
                        <p className="text-secondcolor font-bold text-lg">We have been working in the industry since 2011.</p>
                    </motion.div>

                    {/* Item 2 */}
                    <motion.div className="space-y-2 text-center lg:w-[40%] xl:w-full xl:text-start sm:mb-5" variants={rightToLeftVariants}>
                        <div className="flex flex-col items-center gap-3 xl:flex-row mb-5 sm:mb-0">
                            <h1 className="text-blackcolor xl:text-6xl lg:text-5xl font-semibold sm:mb-0 sm:text-3xl"><BsBox2Heart /></h1>
                            <h4 className="text-blackcolor relative before:content-[''] before:bg-firstcolor before:h-1 before:w-5 before:absolute before:-bottom-2 before:left-[35%] pb-1 xl:pb-2 xl:before:left-0 lg:text-1xl xl:text-2xl font-bold">
                                Seserahan Box
                            </h4>
                        </div>
                        <p className="text-secondcolor font-bold text-lg">To this day, we have designed 54 residential projects.</p>
                    </motion.div>

                    {/* Item 3 */}
                    <motion.div className="space-y-2 text-center lg:w-full xl:w-full xl:text-start sm:mb-5" variants={rightToLeftVariants}>
                        <div className="flex flex-col items-center gap-3 xl:flex-row mb-5 sm:mb-0">
                            <h1 className="text-blackcolor xl:text-6xl lg:text-5xl font-semibold sm:mb-0 sm:text-3xl"><BsEnvelopePaperHeart /></h1>
                            <h4 className="text-blackcolor relative before:content-[''] before:bg-firstcolor before:h-1 before:w-5 before:absolute before:-bottom-2 before:left-[35%] pb-1 xl:pb-2 xl:before:left-0 font-bold lg:text-1xl xl:text-2xl">
                                Undangan
                            </h4>
                        </div>
                        <p className="lg:w-[40%] mx-auto xl:w-full text-secondcolor font-bold text-lg">Spectrum has been awarded for creativity many times.</p>
                    </motion.div>

                    {/* Item 4 */}
                    <motion.div className="space-y-2 text-center lg:w-[40%] xl:w-full xl:text-start sm:mb-5" variants={rightToLeftVariants}>
                        <div className="flex flex-col items-center gap-3 xl:flex-row mb-5 sm:mb-0">
                            <h1 className="text-blackcolor xl:text-6xl lg:text-5xl font-semibold sm:mb-0 sm:text-3xl"><TfiGift /></h1>
                            <h4 className="text-blackcolor relative before:content-[''] before:bg-firstcolor before:h-1 before:w-5 before:absolute before:-bottom-2 before:left-[35%] pb-1 xl:pb-2 xl:before:left-0 lg:text-1xl xl:text-2xl font-bold">
                                Gift
                            </h4>
                        </div>
                        <p className="text-secondcolor font-bold text-lg">To this day, we have designed 54 residential projects.</p>
                    </motion.div>

                    {/* Item 5 */}
                    <motion.div className="space-y-2 text-center lg:w-[40%] xl:w-full xl:text-start sm:mb-5" variants={rightToLeftVariants}>
                        <div className="flex flex-col items-center gap-2 xl:flex-row mb-5 sm:mb-0">
                            <h1 className="text-blackcolor xl:text-6xl lg:text-5xl font-semibold sm:mb-0 sm:text-3xl"><IoNewspaperOutline /></h1>
                            <h4 className="text-blackcolor relative before:content-[''] before:bg-firstcolor before:h-1 before:w-5 before:absolute before:-bottom-2 before:left-[35%] pb-1 xl:pb-2 xl:before:left-0 lg:text-1xl xl:text-2xl font-bold">
                                Advertising
                            </h4>
                        </div>
                        <p className="text-secondcolor font-bold text-lg">We have been working in the industry since 2011.</p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Company;
