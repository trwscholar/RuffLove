import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
}) => {
  const [activeStep, setActiveStep] = useState(currentStep);

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    onStepChange?.(stepId);
  };

  const isStepCompleted = (stepId: number) => stepId < activeStep;
  const isStepActive = (stepId: number) => stepId === activeStep;

  // Position steps around a hexagon layout
  const getHexagonPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const radius = 180; // tighter circle
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <section className="py-12 bg-pink-50 relative overflow-hidden">
      <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
        {/* Header */}
        <div className="text-center mb-8">
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
        </div>

        {/* Desktop Hexagon Layout */}
        <div className="hidden lg:block relative mb-10">
          <div className="relative h-[500px] flex items-center justify-center">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const completed = isStepCompleted(step.id);
              const active = isStepActive(step.id);
              const pos = getHexagonPosition(index, processSteps.length);

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
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div
                    className={cn(
                      "relative bg-white border-2 rounded-xl p-5 shadow-md w-56 h-36 cursor-pointer transition-all duration-300",
                      active && "border-red-500 shadow-lg ring-2 ring-red-100",
                      completed && "border-green-500 ring-2 ring-green-100",
                      !active && !completed && "border-pink-200 hover:border-pink-300"
                    )}
                    onClick={() => handleStepClick(step.id)}
                  >
                    {/* Icon */}
                    <div className="flex items-center justify-center mb-2">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center",
                          completed ? "bg-green-500" : active ? "bg-red-500" : "bg-pink-100"
                        )}
                      >
                        {completed ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Icon
                            className={active ? "text-white w-6 h-6" : "text-pink-600 w-6 h-6"}
                          />
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
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout (unchanged) */}
        <div className="lg:hidden space-y-6 mb-12">
          {processSteps.map((step) => {
            const Icon = step.icon;
            const completed = isStepCompleted(step.id);
            const active = isStepActive(step.id);

            return (
              <div
                key={step.id}
                className={cn(
                  "relative bg-white border-2 rounded-xl p-5 shadow-md",
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
                      <Icon
                        className={active ? "text-white w-6 h-6" : "text-pink-600 w-6 h-6"}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Button */}
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
