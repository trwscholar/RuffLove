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

    // Split title into two lines for better circle integration
    const renderSplitTitle = () => {
        if (title.includes("Who We Are At Ruff Love Malaysia")) {
            return (
                <>
                    <div className="text-gray-900">Who We Are At</div>
                    <div className="text-red-500 mt-2">Ruff Love Malaysia</div>
                </>
            );
        }
        // Fallback for other titles
        if (title.includes("Ruff Love Malaysia")) {
            const parts = title.split("Ruff Love Malaysia");
            return (
                <>
                    <div className="text-gray-900">{parts[0].trim()}</div>
                    <div className="text-red-500 mt-2">Ruff Love Malaysia</div>
                    {parts[1] && <div className="text-gray-900">{parts[1].trim()}</div>}
                </>
            );
        }
        return <div className="text-gray-900">{title}</div>;
    };

    return (
        <div ref={ref} className={`relative w-full max-w-5xl mx-auto py-8 ${className}`}>
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.svg
                    key={animationKey} // Force re-render on animation reset
                    width="100%"
                    height="100%"
                    viewBox="0 0 1400 300"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="w-full h-full min-h-[180px]"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <title>Hand Written Circle</title>
                    {/* Oval circle path optimized for two-line text */}
                    <motion.path
                      d="M 1100 60
                         C 1350 90, 1320 180, 1000 220
                         C 680 260, 350 240, 300 150
                         C 250 60, 450 40, 700 40
                         C 950 40, 1100 80, 1100 80"
                      fill="none"
                      strokeWidth="12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={draw}
                      className="text-red-500 opacity-80"
                    />
                </motion.svg>
            </div>
            <div className="relative text-center z-10 flex flex-col items-center justify-center px-4 min-h-[180px]">
                <motion.h2
                    key={`text-${animationKey}`} // Force re-render on animation reset
                    className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-extrabold leading-tight flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: isVisible ? 0.5 : 0, duration: 0.8 }}
                >
                    {renderSplitTitle()}
                </motion.h2>
            </div>
        </div>
    );
}

export { HandWrittenTitle };