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

  // Auto-advance timer
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

  // Circular positioning (desktop)
  const getCircularPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const radius = 220; // smaller radius for tighter layout
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <section
      className="py-12 bg-pink-50 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={cn("w-full max-w-6xl mx-auto px-4", className)}>
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-2 font-rounded">
              Simple Adoption Process
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Just 6 easy steps to bring your new best friend home
            </p>
            <div className="flex justify-center mt-2">
              <span className="text-red-500">🐾</span>
              <span className="text-red-500">🐾</span>
              <span className="text-red-500">🐾</span>
            </div>
          </motion.div>
        </div>

        {/* Desktop Circular Layout */}
        <div className="hidden lg:block relative mb-12">
          <div className="relative h-[600px] flex items-center justify-center">
            {/* Optional subtle connectors */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 600 600"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="300,80 520,200 520,400 300,520 80,400 80,200"
                fill="none"
                stroke="#f8cbd0"
                strokeWidth="2"
                strokeDasharray="6,6"
              />
            </svg>

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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    className={cn(
                      "relative bg-white border-2 rounded-2xl p-5 cursor-pointer transition-all duration-500 ease-out",
                      "group overflow-hidden shadow-lg w-64 h-40",
                      active && "border-red-500 shadow-xl ring-4 ring-red-100",
                      completed && "border-green-500 ring-4 ring-green-100",
                      !active && !completed && "border-pink-200 hover:border-pink-300"
                    )}
                    onClick={() => handleStepClick(step.id)}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {/* Icon */}
                    <div className="flex items-center justify-center mb-3">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center",
                          completed ? "bg-green-500" : active ? "bg-red-500" : "bg-pink-100"
                        )}
                      >
                        {completed ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Icon className={active ? "text-white w-6 h-6" : "text-pink-600 w-6 h-6"} />
                        )}
                      </div>
                    </div>

                    {/* Title + Desc */}
                    <h3
                      className={cn(
                        "text-md font-bold mb-1",
                        active && "text-red-600",
                        completed && "text-green-600"
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600">{step.description}</p>
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
                className="relative"
              >
                <motion.div
                  className={cn(
                    "relative bg-white border-2 rounded-2xl p-6 shadow-md",
                    active && "border-red-500 ring-2 ring-red-100",
                    completed && "border-green-500 ring-2 ring-green-100"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center",
                        completed ? "bg-green-500" : active ? "bg-red-500" : "bg-pink-100"
                      )}
                    >
                      {completed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className={active ? "text-white w-6 h-6" : "text-pink-600 w-6 h-6"} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Start Button */}
        <div className="text-center">
          <motion.button className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-400 transition-all">
            Start Adoption Process 🐾
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AnimalAdoptionProcess;
