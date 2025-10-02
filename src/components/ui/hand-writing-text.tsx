"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface HandWrittenTitleProps {
    title?: string;
    className?: string;
}

function HandWrittenTitle({
    title = "Hand Written",
    className = "",
}: HandWrittenTitleProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setAnimationKey(prev => prev + 1); // Force re-animation
                } else {
                    setIsVisible(false);
                }
            },
            { 
                threshold: 0.3, // Trigger when 30% of component is visible
                rootMargin: '-50px 0px' // Add some margin for better mobile experience
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

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

    // Parse title to highlight "Ruff Love Malaysia" in red
    const renderTitle = () => {
        if (title.includes("Ruff Love Malaysia")) {
            const parts = title.split("Ruff Love Malaysia");
            return (
                <>
                    {parts[0]}
                    <span className="text-red-500">Ruff Love Malaysia</span>
                    {parts[1]}
                </>
            );
        }
        return title;
    };

    return (
        <div ref={ref} className={`relative w-full max-w-5xl mx-auto py-8 ${className}`}>
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.svg
                    key={animationKey} // Force re-render on animation reset
                    width="100%"
                    height="100%"
                    viewBox="0 0 1400 400"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="w-full h-full min-h-[120px]"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <title>Hand Written Circle</title>
                    {/* Responsive circle path that adapts to text length */}
                    <motion.path
                        d="M 1210 88
                             C 1485 165, 1430 308, 990 352
                             C 550 396, 110 352, 110 220
                             C 110 88, 330 44, 770 44
                             C 1100 44, 1210 132, 1210 132"
                        fill="none"
                        strokeWidth="15"
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
                    key={`text-${animationKey}`} // Force re-render on animation reset
                    className="text-3xl md:text-4xl lg:text-5xl text-gray-900 tracking-tight font-extrabold leading-snug"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: isVisible ? 0.5 : 0, duration: 0.8 }}
                >
                    {renderTitle()}
                </motion.h2>
            </div>
        </div>
    );
}

export { HandWrittenTitle };