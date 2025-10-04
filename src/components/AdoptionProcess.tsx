"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, FileText, Video, CreditCard, MapPin, MessageCircle, CheckCircle } from "lucide-react";

// Utility function for className merging
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  completed?: boolean;
}

interface AnimalAdoptionProcessProps {
  currentStep?: number;
  onStepChange?: (step: number) => void;
  className?: string;
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Browse Pets",
    description: "Scroll our Instagram and pick a doggo or catto you like",
    icon: Instagram,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    id: 2,
    title: "Apply Form",
    description: "Fill in our adoption form with details",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: 3,
    title: "Home Check",
    description: "Provide a short video of your home",
    icon: Video,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 4,
    title: "Adoption Fee",
    description: "Pay the non-refundable fee covering care and supplies",
    icon: CreditCard,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    id: 5,
    title: "Pick Up",
    description: "Collect your new furry friend yourself",
    icon: MapPin,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: 6,
    title: "Follow-Up",
    description: "Send updates and keep us informed post-adoption",
    icon: MessageCircle,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
];

const AnimalAdoptionProcess: React.FC<AnimalAdoptionProcessProps> = ({
  currentStep = 1,
  onStepChange,
  className,
  autoAdvance = true,
  autoAdvanceInterval = 2000,
}) => {
  const [activeStep, setActiveStep] = useState(currentStep);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setActiveStep(currentStep);
  }, [currentStep]);

  // Auto-advance timer
  useEffect(() => {
    if (!autoAdvance || isPaused) return;

    const timer = setInterval(() => {
      setActiveStep(prev => {
        const nextStep = prev >= processSteps.length ? 1 : prev + 1;
        onStepChange?.(nextStep);
        return nextStep;
      });
    }, autoAdvanceInterval);

    return () => clearInterval(timer);
  }, [autoAdvance, autoAdvanceInterval, isPaused, onStepChange]);
  const handleStepClick = (stepId: number) => {
    setIsPaused(true);
    setActiveStep(stepId);
    onStepChange?.(stepId);
    
    // Resume auto-advance after a delay
    setTimeout(() => {
      setIsPaused(false);
    }, autoAdvanceInterval * 1.5);
  };

  const isStepCompleted = (stepId: number) => stepId < activeStep;
  const isStepActive = (stepId: number) => stepId === activeStep;

  return (
    <section 
      className="py-16 bg-pink-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={cn("w-full max-w-7xl mx-auto px-4", className)}>
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-rounded">
              Simple Adoption Process
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Just 6 easy steps to bring your new best friend home
            </p>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                <span className="text-red-500">🐾</span>
                <span className="text-red-500">🐾</span>
                <span className="text-red-500">🐾</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Lines - Modified for 6 steps */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1">
            <div className="flex items-center justify-between h-full px-12">
              {processSteps.slice(0, -1).map((_, index) => (
                <motion.div
                  key={index}
                  className="flex-1 h-1 mx-2 rounded-full bg-gray-200"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: 1,
                    backgroundColor: activeStep > index + 1
                      ? "#E53935" 
                      : "#E5E7EB"
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{ transformOrigin: "left" }}
                />
              ))}
            </div>
          </div>

          {/* Steps Grid - Modified for 6 steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const completed = isStepCompleted(step.id);
              const active = isStepActive(step.id);
              const hovered = hoveredStep === step.id;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <motion.div
                    className={cn(
                      "relative bg-white border-2 rounded-2xl p-4 cursor-pointer transition-all duration-500 ease-out",
                      "group overflow-hidden shadow-lg",
                      active && "border-red-500 shadow-xl",
                      completed && "border-green-500",
                      !active && !completed && "border-gray-200"
                    )}
                    onClick={() => handleStepClick(step.id)}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 15,
                      rotateX: 5,
                      z: 50
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: 1000
                    }}
                    animate={{
                      scale: active ? 1.02 : 1,
                      boxShadow: active 
                        ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* 3D Hover Effect Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Floating particles effect */}
                    {hovered && (
                      <>
                        <motion.div
                          className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full"
                          animate={{
                            y: [-10, -30, -10],
                            x: [0, 10, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="absolute top-6 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full"
                          animate={{
                            y: [-5, -25, -5],
                            x: [0, -8, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.div
                          className="absolute bottom-4 right-6 w-1 h-1 bg-blue-400 rounded-full"
                          animate={{
                            y: [10, -10, 10],
                            x: [0, 5, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                      </>
                    )}
                    
                    {/* Step Number/Icon Container */}
                    <div className="flex items-center justify-center mb-3">
                      <motion.div
                        className={cn(
                          "relative w-12 h-12 rounded-full flex items-center justify-center",
                          "border-2 transition-all duration-300",
                          completed && "bg-green-500 border-green-500",
                          active && !completed && "bg-red-500 border-red-500",
                          !active && !completed && "bg-gray-100 border-gray-200"
                        )}
                        animate={{
                          scale: hovered ? 1.1 : 1,
                          rotate: hovered ? 5 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <AnimatePresence mode="wait">
                          {completed ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircle className="w-6 h-6 text-white" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="icon"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Icon 
                                className={cn(
                                  "w-6 h-6",
                                  active ? "text-white" : "text-gray-600"
                                )} 
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Cute floating hearts animation */}
                        {(active || hovered) && (
                          <motion.div
                            className="absolute -top-1 -right-1"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                              y: [0, -20, -40]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1
                            }}
                          >
                            <span className="text-pink-500 text-sm">💕</span>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>

                    {/* Step Content */}
                    <div className="text-center">
                      <motion.h3
                        className={cn(
                          "text-lg font-bold mb-2 transition-colors duration-300 font-rounded",
                          active && "text-red-500",
                          completed && "text-green-600",
                          !active && !completed && "text-gray-800"
                        )}
                        animate={{ scale: hovered ? 1.05 : 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {step.title}
                      </motion.h3>
                      <motion.p
                        className="text-xs text-gray-600 leading-relaxed"
                        animate={{ opacity: hovered ? 1 : 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {step.description}
                      </motion.p>
                    </div>

                    {/* Cute paw prints decoration */}
                    {active && (
                      <motion.div
                        className="absolute -bottom-1 -right-1"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <span className="text-lg">🐾</span>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Step number badge */}
                  <motion.div
                    className={cn(
                      "absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center",
                      "text-xs font-bold border-2 bg-white",
                      completed && "bg-green-500 border-green-500 text-white",
                      active && !completed && "bg-red-500 border-red-500 text-white",
                      !active && !completed && "bg-gray-100 border-gray-200 text-gray-600"
                    )}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  >
                    {step.id}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {processSteps.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full cursor-pointer",
                activeStep === index + 1 ? "bg-red-500" : "bg-gray-300"
              )}
              onClick={() => handleStepClick(index + 1)}
              animate={{
                scale: activeStep === index + 1 ? 1.2 : 1,
                backgroundColor: activeStep === index + 1 ? "#E53935" : "#D1D5DB"
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className={cn(
              "group bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-400 hover:scale-105 transition-all duration-300 hover:shadow-pink-200 hover:shadow-xl relative overflow-hidden"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Start Adopting Today!</span>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              🐾
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimalAdoptionProcess;