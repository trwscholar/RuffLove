import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  FileText,
  Home,
  CreditCard,
  Car,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

// Utility function for className merging
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Browse Pets",
    description: "Scroll our Instagram and pick a doggo or catto you like",
    icon: Heart,
  },
  {
    id: 2,
    title: "Apply Form",
    description: "Fill in our adoption form with details",
    icon: FileText,
  },
  {
    id: 3,
    title: "Home Check",
    description: "Provide a short video of your home",
    icon: Home,
  },
  {
    id: 4,
    title: "Adoption Fee",
    description: "Pay the non-refundable fee covering care and supplies",
    icon: CreditCard,
  },
  {
    id: 5,
    title: "Pick Up",
    description: "Collect your new furry friend yourself",
    icon: Car,
  },
  {
    id: 6,
    title: "Follow-Up",
    description: "Send updates and keep us informed post-adoption",
    icon: MessageSquare,
  },
];

const AnimalAdoptionProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  // Circular positioning
  const getCircularPosition = (index: number, total: number, radius: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <section className="py-20 bg-pink-50 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-rounded">
            Simple Adoption Process
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
        </div>

        {/* Desktop Circular Layout */}
        <div className="hidden lg:block relative mb-16">
          <div className="relative h-[750px] flex items-center justify-center">
            {/* Connector Lines */}
            {processSteps.map((_, index) => {
              const { x: x1, y: y1 } = getCircularPosition(
                index,
                processSteps.length,
                260
              );
              const { x: x2, y: y2 } = getCircularPosition(
                (index + 1) % processSteps.length,
                processSteps.length,
                260
              );
              return (
                <svg
                  key={`line-${index}`}
                  className="absolute w-full h-full"
                  style={{ left: 0, top: 0 }}
                >
                  <line
                    x1={375 + x1}
                    y1={375 + y1}
                    x2={375 + x2}
                    y2={375 + y2}
                    stroke="#fda4af"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                  />
                </svg>
              );
            })}

            {/* Circular Steps */}
            {processSteps.map((step, index) => {
              const { x, y } = getCircularPosition(
                index,
                processSteps.length,
                260
              );
              const Icon = step.icon;
              const active = step.id === activeStep;

              return (
                <motion.div
                  key={step.id}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                >
                  <motion.div
                    className={cn(
                      "relative bg-white border-2 rounded-2xl p-6 cursor-pointer transition-all duration-500 ease-out",
                      "group overflow-hidden shadow-lg w-56 h-40",
                      active
                        ? "border-red-500 shadow-xl ring-4 ring-red-100"
                        : "border-pink-200 hover:border-pink-300"
                    )}
                    onClick={() => setActiveStep(step.id)}
                  >
                    {/* Step Number Badge */}
                    <div
                      className={cn(
                        "absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center",
                        "text-sm font-bold border-2 bg-white shadow-md",
                        active
                          ? "bg-red-500 border-red-500 text-white"
                          : "bg-pink-100 border-pink-200 text-pink-600"
                      )}
                    >
                      {step.id}
                    </div>

                    {/* Icon */}
                    <div className="flex items-center justify-center mb-4">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center border-2",
                          active
                            ? "bg-red-500 border-red-500"
                            : "bg-pink-100 border-pink-200"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-7 h-7",
                            active ? "text-white" : "text-pink-600"
                          )}
                        />
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="text-center relative z-10">
                      <h3
                        className={cn(
                          "text-lg font-bold mb-2 font-rounded",
                          active ? "text-red-600" : "text-gray-800"
                        )}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Layout */}
        <div className="lg:hidden space-y-6 mb-12">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: step.id * 0.1 }}
                className="relative"
              >
                <div
                  className={cn(
                    "relative bg-white border-2 rounded-2xl p-6 shadow-lg"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-pink-100 border-2 border-pink-200">
                      <Icon className="w-7 h-7 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AnimalAdoptionProcess;
