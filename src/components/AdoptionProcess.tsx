import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, FileText, Home, CreditCard, Car, MessageSquare, CheckCircle } from "lucide-react";

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
    icon: Heart,
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
    icon: Home,
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
    icon: Car,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: 6,
    title: "Follow-Up",
    description: "Send updates and keep us informed post-adoption",
    icon: MessageSquare,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
];

const AnimalAdoptionProcess: React.FC<AnimalAdoptionProcessProps> = ({
  currentStep = 1,
  onStepChange,
  className,
  autoAdvance = true,
  autoAdvanceInterval = 4000,
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

  // Circular positions for 6 evenly spaced steps
  const getCircularPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start at top
    const radius = 300; // Balanced spacing
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <section 
      className="py-20 bg-pink-50 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={cn("w-full max-w-7xl mx-auto px-4", className)}>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-rounded">
              Simple Adoption ES
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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

        {/* Desktop Circular Layout */}
        <div className="hidden lg:block relative mb-16">
          <div className="relative h-[700px] flex items-center justify-center">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const completed = isStepCompleted(step.id);
              const active = isStepActive(step.id);
              const hovered = hoveredStep === step.id;
              const position = getCircularPosition(index, processSteps.length);

              return (
                <motion.div
                  key={step.id}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${position.x}px)`,
                    top: `calc(50% + ${position.y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                >
                  {/* Step Card */}
                  <motion.div
                    className={cn(
                      "relative bg-white border-2 rounded-2xl p-6 cursor-pointer transition-all duration-500 ease-out",
                      "group overflow-hidden shadow-lg w-64 h-44",
                      active && "border-red-500 shadow-xl ring-4 ring-red-100",
                      completed && "border-green-500 ring-4 ring-green-100",
                      !active && !completed && "border-pink-200 hover:border-pink-300"
                    )}
                    onClick={() => handleStepClick(step.id)}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Step Number Badge */}
                    <motion.div
                      className={cn(
                        "absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center",
                        "text-sm font-bold border-2 bg-white shadow-md",
                        completed && "bg-green-500 border-green-500 text-white",
                        active && !completed && "bg-red-500 border-red-500 text-white",
                        !active && !completed && "bg-pink-100 border-pink-200 text-pink-600"
                      )}
                    >
                      {step.id}
                    </motion.div>

                    {/* Icon */}
                    <div className="flex items-center justify-center mb-4">
                      <motion.div
                        className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center border-2",
                          completed && "bg-green-500 border-green-500",
                          active && !completed && "bg-red-500 border-red-500",
                          !active && !completed && "bg-pink-100 border-pink-200"
                        )}
                        animate={{
                          scale: hovered ? 1.1 : 1,
                        }}
                      >
                        <AnimatePresence mode="wait">
                          {completed ? (
                            <CheckCircle className="w-7 h-7 text-white" />
                          ) : (
                            <Icon className={cn("w-7 h-7", active ? "text-white" : "text-pink-600")} />
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Title + Description */}
                    <div className="text-center">
                      <h3
                        className={cn(
                          "text-lg font-bold mb-1",
                          active && "text-red-600",
                          completed && "text-green-600",
                          !active && !completed && "text-gray-800"
                        )}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-snug">{step.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Layout (unchanged) */}
        <div className="lg:hidden space-y-6 mb-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const completed = isStepCompleted(step.id);
            const active = isStepActive(step.id);

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Mobile step card code unchanged */}
                {/* ... */}
              </motion.div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8 space-x-2">
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
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Start Adoption Process Button */}
        <div className="text-center">
          <motion.button
            className="group bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-400 hover:scale-105 transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Start Adoption Process</span>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              🐾
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AnimalAdoptionProcess;
