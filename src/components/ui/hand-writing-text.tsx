"use client";

import { motion } from "framer-motion";

interface HandWrittenTitleProps {
    title?: string;
    subtitle?: string;
    className?: string;
}

function HandWrittenTitle({
    title = "Hand Written",
    subtitle = "Optional subtitle",
    className = "",
}: HandWrittenTitleProps) {
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 3, ease: [0.43, 0.13, 0.23, 0.96] },
                opacity: { duration: 0.5 },
            },
        },
    };

    return (
        <div className={`relative w-full max-w-5xl mx-auto py-8 ${className}`}>
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1400 400"
                    initial="hidden"
                    animate="visible"
                    className="w-full h-full min-h-[120px]"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <title>Ruff Love Malaysia</title>
                    {/* Responsive circle path that adapts to text length */}
                    <motion.path
                        d="M 1100 80 
                           C 1350 150, 1300 280, 900 320
                           C 500 360, 100 320, 100 200
                           C 100 80, 300 40, 700 40
                           C 1000 40, 1100 120, 1100 120"
                        fill="none"
                        strokeWidth="8"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={draw}
                        className="text-red-500 opacity-80"
                    />
                </motion.svg>
            </div>
            <div className="relative text-center z-10 flex flex-col items-center justify-center px-4">
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl text-gray-900 tracking-tight font-extrabold leading-snug"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {title}
                </motion.h2>
                {subtitle && (
                    <motion.p
                        className="text-lg md:text-xl text-gray-600 mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </div>
    );
}

export { HandWrittenTitle };