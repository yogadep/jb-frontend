import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from "framer-motion";

// Import images
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide4.jpeg';
import slide5 from '../assets/slide5.jpeg';
import slide6 from '../assets/slide6.jpeg';


const properties = [
    {
        id: 1,
        image: slide1,
        location: "Photography",
        size: "Wedding",
        // price: "$ 200 000"
    },
    {
        id: 2,
        image: slide2,
        location: "Photography",
        size: "Graduation",
        // price: "$ 200 000"
    },
    // {
    //     id: 3,
    //     image: slide3,
    //     location: "Photography",
    //     size: "Maternity",
    //     // price: "$ 500 000"
    // },
    {
        id: 4,
        image: slide4,
        location: "Photography",
        size: "Maternity",
        // price: "$ 50 000"
    },
    {
        id: 5,
        image: slide5,
        location: "Photography",
        size: "Pre Wedding",
        // price: "$ 50 000"   
    },
    {
        id: 6,
        image: slide6,
        location: "Craft",
        size: "Wedding Gifts",
        // price: "$ 50 000"   
    },

];

const Hero = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [displayedProperty, setDisplayedProperty] = useState(properties[0]);
    const [textVisible, setTextVisible] = useState(true);
    const [slideDirection, setSlideDirection] = useState('next'); // Menambahkan state untuk arah slide

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 4000);

        return () => clearInterval(interval);
    }, [activeSlide]);

    const handleSlideChange = (nextIndex, direction) => {
        if (isSliding) return;

        setAnimating(true);
        setIsSliding(true);
        setTextVisible(false);
        setSlideDirection(direction);

        setTimeout(() => {
            setDisplayedProperty(properties[nextIndex]);
            setTextVisible(true);
        }, 500);

        setTimeout(() => {
            setActiveSlide(nextIndex);
            setAnimating(false);
            setIsSliding(false);
        }, 1000);
    };

    const handleNextSlide = () => {
        const nextIndex = (activeSlide + 1) % properties.length;
        handleSlideChange(nextIndex, 'next');
    };

    const handlePrevSlide = () => {
        const nextIndex = (activeSlide - 1 + properties.length) % properties.length;
        handleSlideChange(nextIndex, 'prev');
    };

    return (
        <div className="relative h-full bg-[#120d0d] text-white">
            <div className="flex flex-col lg:flex-row h-full">
                {/* Left Section */}
                <div className="relative flex flex-col justify-between w-full lg:w-[30%] px-4 md:px-6 py-8 lg:py-0">
                        <div className="home__title flex flex-col gap-6 md:gap-8 justify-center lg:h-[calc(100%-100px)] py-6 md:py-8 lg:py-12 xl:py-1 xl:gap-16">
                            <motion.h1
                                className="text-lg sm:text-4xl md:text-2xl lg:text-2xl xl:text-4xl font-bold uppercase text-center w-full"
                                initial={{ opacity: 0, x: -100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5 }}
                            >
                                JIBO <br />
                                UNLIMITED
                            </motion.h1>

                            <motion.h4
                                className="text-[#E31E24] font-bold uppercase text-center text-xs sm:text-lg md:text-base"
                                initial={{ opacity: 0, x: -100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 2 }}
                            >
                                PHOTOGRAPHY <br />
                                &  <br />
                                CRAFTING <br />
                            </motion.h4>
                    </div>
                    <div className="button__control flex items-center justify-center gap-4 
                    w-full h-[60px] sm:h-[70px] md:h-[80px] lg:h-[140px] 
                    bg-[#120d0d] lg:w-[384px] lg:-ml-7">
                        <motion.button
                            onClick={handlePrevSlide}
                            className="carousel__button__prev lg:-mt-6 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 border-2 border-[#808080] rounded-full grid place-items-center hover:scale-120 hover:border-white transition-all duration-300 ease-in-out"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 hover:text-white transition-colors duration-300" />
                        </motion.button>
                        <motion.button
                            onClick={handleNextSlide}
                            className="carousel__button__next lg:-mt-6 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 border-2 border-[#808080] rounded-full grid place-items-center hover:scale-120 hover:border-white transition-all duration-300 ease-in-out"
                            disabled={isSliding}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 hover:text-white transition-colors duration-300" />
                        </motion.button>
                    </div>
                </div>

                {/* Right Section - Carousel */}
                <div className="lg:w-[70%]">
                    <div className="carousel carousel__fade relative h-full overflow-hidden">
                        <motion.div
                            className="h-[calc(100vh-200px)] sm:h-[calc(100vh-500px)] md:h-[calc(98vh-160px)] relative"
                            initial={{ opacity: 0, x: 350 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            {properties.map((property, index) => (
                                <div
                                    key={property.id}
                                    className={`carousel__item absolute w-full h-full transition-opacity duration-500 
                                        ${index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                                    style={{
                                        transform: index === activeSlide ? 'translateX(0)' :
                                            slideDirection === 'next' ? 'translateX(100%)' : 'translateX(-100%)',
                                        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out'
                                    }}
                                >
                                    <img
                                        src={property.image}
                                        alt={property.location}
                                        className="carousel__img w-full h-full object-cover rounded-xl"
                                    />
                                </div>
                            ))}
                        </motion.div>

                        <div className="h-auto min-h-[80px] md:min-h-[90px] lg:min-h-[100px] bg-[#120d0d] px-4 md:px-6 lg:px-8 py-4 md:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-[#2A2A2A] gap-4 sm:gap-0">
                            {/* <motion.div
                                className="text-[#454545] text-3xl md:text-2xl lg:text-3xl font-bold tracking-wider uppercase sm:hidden md:block"
                                initial={{ opacity: 0, x: 350 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                            >
                                63+ works
                            </motion.div> */}

                            <motion.div
                                className="flex items-center gap-14 md:gap-6 sm:gap-10 lg:gap-12 sm:justify-center"
                                initial={{ opacity: 0, y: -50 }}
                                whileInView={{ opacity: 1, y: 1 }}
                                transition={{ duration: 2 }}
                            >
                                <h4 className={`text-white whitespace-nowrap text-sm md:text-lg lg:text-xl font-bold tracking-wider uppercase transition-all duration-500 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                                    {displayedProperty.location}
                                </h4>
                                <h4 className={`text-[#E31E24] whitespace-nowrap text-sm md:text-lg lg:text-xl font-bold tracking-wider transition-all duration-500 delay-[100ms] ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                                    {displayedProperty.size}
                                </h4>
                                <h4 className={`text-[#E31E24] text-sm md:text-lg lg:text-xl whitespace-nowrap font-bold tracking-wider transition-all duration-500 delay-[200ms] ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                                    {displayedProperty.price}
                                </h4>
                                <h4 className={`hidden xl:block border-b w-32 border-graycolor transition-all duration-500 delay-[300ms] ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}></h4>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translatex(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translatex(0);
                    }
                }

                @keyframes fadeOut {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default Hero;