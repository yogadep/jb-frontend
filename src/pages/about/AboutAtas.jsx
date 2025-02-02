import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.2, duration: 0.6 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

export default function HeroSection() {
    return (
        <section className="bg-white py-20 px-6 md:px-16">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-4xl mx-auto text-center"
            >
                <motion.h2 variants={itemVariants} className="text-5xl font-bold text-gray-900 leading-tight">
                    Two Brothers With A Camera
                </motion.h2>
                <motion.span variants={itemVariants} className="text-sm text-gray-500 tracking-widest mb-4 block">
                    SINCE 2018
                </motion.span>
            </motion.div>

            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="text-gray-600 leading-relaxed space-y-6 max-w-3xl mx-auto mt-6"
            >
                <motion.p variants={itemVariants}>
                    Fueled by passion and an unyielding dedication to the art of photography, <span className="font-semibold text-black">JIBO</span> was born. 
                    Founded by two brothers, ET and NY, alongside our mentor, HEN, our journey began with a simple joy—capturing life’s most treasured moments. 
                    Over time, this passion evolved, leading us to specialize in weddings, graduations, and professional documentation, turning fleeting memories into timeless visuals.
                </motion.p>

                <motion.p variants={itemVariants}>
                    What started as a shared hobby quickly turned into a lifelong commitment to storytelling through the lens. 
                    With each click of the shutter, we discovered the power of photography—not just to document events, 
                    but to evoke emotions, tell stories, and create meaningful connections with people from all walks of life. 
                    This realization became the foundation of our craft, pushing us to refine our skills and develop a unique style that blends creativity with authenticity.
                </motion.p>

                <motion.p variants={itemVariants}>
                    Beyond photography, we continue to push creative boundaries through our special division, <span className="font-bold text-gray-800">JIBOCRAFT</span>. 
                    This extension allows us to explore new artistic possibilities while staying true to our core mission—preserving moments that matter with authenticity and craftsmanship.
                </motion.p>
            </motion.div>

            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex justify-center gap-10 mt-10"
            >
                <motion.div variants={itemVariants} className="text-center">
                    <span className="text-4xl font-bold text-gray-900">500+</span>
                    <p className="text-gray-500">Projects Completed</p>
                </motion.div>
                <motion.div variants={itemVariants} className="text-center">
                    <span className="text-4xl font-bold text-gray-900">7+</span>
                    <p className="text-gray-500">Years Experience</p>
                </motion.div>
                <motion.div variants={itemVariants} className="text-center">
                    <span className="text-4xl font-bold text-gray-900">100%</span>
                    <p className="text-gray-500">Client Satisfaction</p>
                </motion.div>
            </motion.div>
            <div className="w-16 h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto mt-6"></div>
        </section>
    );
}
