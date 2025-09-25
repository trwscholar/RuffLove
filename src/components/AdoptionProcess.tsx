import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  FileText,
  Home,
  CreditCard,
  Car,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

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

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
  };

  const isStepCompleted = (stepId: number) => stepId < activeStep;
  const isStepActive = (stepId: number) => stepId === activeStep;

  return (
    <section className="py-12 bg-pink-50 relative overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
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

        {/* Desktop Hexagon Grid Layout */}
        <div className="hidden lg:grid grid-cols-3 gap-x-12 gap-y-12 justify-items-center mb-12">
          {/* Row 1 */}
          <div className="col-span-3 flex justify-center space-x-12">
            {processSteps.slice(0, 2).map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  className={cn(
                    "relative bg-white border-2 rounded-xl p-6 shadow-md w-64 h-40 cursor-pointer transition-all duration-300",
                    isStepActive(step.id) &&
                      "border-red-500 shadow-lg ring-2 ring-red-100",
                    isStepCompleted(step.id) &&
                      "border-green-500 ring-2 ring-green-100"
                  )}
                  onClick={() => handleStepClick(step.id)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                        isStepCompleted(step.id)
                          ? "bg-green-500"
                          : isStepActive(step.id)
                          ? "bg-red-500"
                          : "bg-pink-100"
                      )}
                    >
                      {isStepCompleted(step.id) ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon
                          className={cn(
                            "w-6 h-6",
                            isStepActive(step.id) ? "text-white" : "text-pink-600"
                          )}
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Row 2 */}
          <div className="col-span-3 flex justify-center space-x-12 mt-4">
            {processSteps.slice(2, 4).map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  className={cn(
                    "relative bg-white border-2 rounded-xl p-6 shadow-md w-64 h-40 cursor-pointer transition-all duration-300",
                    isStepActive(step.id) &&
                      "border-red-500 shadow-lg ring-2 ring-red-100",
                    isStepCompleted(step.id) &&
                      "border-green-500 ring-2 ring-green-100"
                  )}
                  onClick={() => handleStepClick(step.id)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                        isStepCompleted(step.id)
                          ? "bg-green-500"
                          : isStepActive(step.id)
                          ? "bg-red-500"
                          : "bg-pink-100"
                      )}
                    >
                      {isStepCompleted(step.id) ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon
                          className={cn(
                            "w-6 h-6",
                            isStepActive(step.id) ? "text-white" : "text-pink-600"
                          )}
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Row 3 */}
          <div className="col-span-3 flex justify-center space-x-12 mt-4">
            {processSteps.slice(4, 6).map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  className={cn(
                    "relative bg-white border-2 rounded-xl p-6 shadow-md w-64 h-40 cursor-pointer transition-all duration-300",
                    isStepActive(step.id) &&
                      "border-red-500 shadow-lg ring-2 ring-red-100",
                    isStepCompleted(step.id) &&
                      "border-green-500 ring-2 ring-green-100"
                  )}
                  onClick={() => handleStepClick(step.id)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                        isStepCompleted(step.id)
                          ? "bg-green-500"
                          : isStepActive(step.id)
                          ? "bg-red-500"
                          : "bg-pink-100"
                      )}
                    >
                      {isStepCompleted(step.id) ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon
                          className={cn(
                            "w-6 h-6",
                            isStepActive(step.id) ? "text-white" : "text-pink-600"
                          )}
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
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
            return (
              <div
                key={step.id}
                className={cn(
                  "relative bg-white border-2 rounded-xl p-6 shadow-md"
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-pink-100">
                    <Icon className="w-6 h-6 text-pink-600" />
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
