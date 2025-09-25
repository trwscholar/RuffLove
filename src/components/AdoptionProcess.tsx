import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, FileText, Home, CreditCard, Car, MessageSquare, CheckCircle } from "lucide-react";

// Utility function for className merging
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
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

  // Auto-advance
  useEffect(() => {
    if (!autoAdvance || isPaused) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => {
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

    setTimeout(() => {
      setIsPaused(false);
    }, autoAdvanceInterval * 1.5);
  };

  const isStepCompleted = (stepId: number) => stepId < activeStep;
  const isStepActive = (stepId: number) => stepId === activeStep;

  // Circular positioning
  const getCircularPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const radius = 350; // larger radius to fix overlap
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
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Simple Adoption Process</h2>
          <p className="text-xl text-gray-600">Just 6 easy steps to bring your new best friend home</p>
          <div className="flex justify-center mt-4 space-x-2">
            <span className="text-red-500">🐾</span>
            <span className="text-red-500">🐾</span>
            <span className="text-red-500">🐾</span>
          </div>
        </div>

        {/* Desktop Circular Layout */}
        <div className="hidden lg:block relative mb-16">
          <div className="relative h-[900px] flex items-center justify-center">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const completed = isStepCompleted(step.id);
              const active = isStepActive(step.id);
              const hovered = hoveredStep === step.id;
              const pos = getCircularPosition(index, processSteps.length);

              return (
                <motion.div
                  key={step.id}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                >
                  <motion.div
                    className={cn(
                      "relative bg-white border-2 rounded-2xl p-5 cursor-pointer transition-all duration-500 ease-out",
                      "group overflow-hidden shadow-lg w-56 h-40",
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
                    {/* Badge */}
                    <div
                      className={cn(
                        "absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 bg-white shadow-md",
                        completed && "bg-green-500 border-green-500 text-white",
                        active && !completed && "bg-red-500 border-red-500 text-white",
                        !active && !completed && "bg-pink-100 border-pink-200 text-pink-600"
                      )}
                    >
                      {step.id}
                    </div>

                    {/* Icon */}
                    <div className="flex items-center justify-center mb-2">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center border-2",
                          completed && "bg-green-500 border-green-500",
                          active && !completed && "bg-red-500 border-red-500",
                          !active && !completed && "bg-pink-100 border-pink-200"
                        )}
                      >
                        {completed ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Icon className={cn("w-6 h-6", active ? "text-white" : "text-pink-600")} />
                        )}
                      </div>
                    </div>

                    {/* Content */}
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
          {processSteps.map((step, index) => (
            <div key={step.id} className="p-4 bg-white rounded-xl shadow-md border border-pink-200">
              <h3 className="font-bold">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center">
          <button className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-400 transition-all">
            Start Adoption Process 🐾
          </button>
        </div>
      </div>
    </section>
  );
};

export default AnimalAdoptionProcess;
