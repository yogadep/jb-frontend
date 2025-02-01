import React, { useState } from "react";
import { motion } from "framer-motion";
import imp1 from "../../assets/process-1.jpg";
import imp2 from "../../assets/process-2.jpg";
import imp3 from "../../assets/process-3.jpg";
import imp4 from "../../assets/process-4.jpg";

const Process = () => {
    const [activeTab, setActiveTab] = useState(1);

    const contentData = {
        1: {
            title: "Initial Photoshoot",
            paragraphs: [
                "The first step in our photo process is the initial photoshoot. We meet with the client to understand their vision and capture the required moments, whether for portraits, weddings, or other events.",
                "During this stage, we ensure that every detail is captured perfectly with a focus on lighting, angles, and composition.",
            ],
            image: imp1,
        },
        2: {
            title: "Photo Selection",
            paragraphs: [
                "After the shoot, we select the best images from the session. We carefully choose photos that represent the moments in the best possible way.",
                "This step is crucial for ensuring we present the client with only the finest shots for further processing.",
            ],
            image: imp2,
        },
        3: {
            title: "Photo Editing",
            paragraphs: [
                "In this stage, we enhance the selected images using professional editing techniques. This includes color correction, retouching, and special effects to make each image shine.",
                "We ensure that every detail is polished to perfection, keeping the client’s preferences in mind while maintaining a natural and artistic look.",
            ],
            image: imp3,
        },
        4: {
            title: "Final Delivery",
            paragraphs: [
                "Once the editing is complete, we prepare the final images for delivery. We provide the client with high-resolution files and can offer printed options upon request.",
                "This is where the project is wrapped up, and the client receives their perfectly edited photos, ready to be cherished.",
            ],
            image: imp4,
        },
    };

    return (
        <section className="py-16 xl:py-28 container mx-auto mt-5 p-10">
            <div className="flex flex-col gap-10 xl:flex-row xl:justify-between">
                {/* Left Section */}
                <div className="space-y-5 xl:w-1/2">
                    <motion.h4
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="text-lg text-firstcolor font-bold uppercase"
                    >
                        4 steps to a perfect photo
                    </motion.h4>

                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="text-3xl xl:text-5xl font-bold uppercase text-white"
                    >
                        How we Do <span className="font-normal">It</span>
                    </motion.h1>

                    {/* Tab Content */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-3 pt-3 xl:pt-28"
                    >
                        <h2 className="text-firstcolor text-xl font-bold">
                            {contentData[activeTab].title}
                        </h2>
                        {contentData[activeTab].paragraphs.map((paragraph, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                }}
                                className="text-gray-400"
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </motion.div>
                </div>

                {/* Right Section */}
                <div className="space-y-10 xl:w-1/2">
                    {/* Tabs */}
                    <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:gap-y-7 text-sm font-semibold">
                        {Object.keys(contentData).map((tab) => (
                            <motion.li
                                key={tab}
                                whileHover={{ scale: 1.1, rotate: 0 }}
                                whileTap={{ scale: 0.95 }}
                                className={`cursor-pointer flex items-center gap-2 uppercase transition ${activeTab === parseInt(tab)
                                    ? "text-firstcolor"
                                    : "text-gray-400"
                                    }`}
                                onClick={() => setActiveTab(parseInt(tab))}
                            >
                                <span>{`0${tab}`}</span>
                                <p>{contentData[tab].title}</p>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Image */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100,
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={contentData[activeTab].image}
                            alt={contentData[activeTab].title}
                            className="w-full rounded-lg shadow-lg"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Process;
