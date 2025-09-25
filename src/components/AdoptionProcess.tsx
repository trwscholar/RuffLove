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
}

interface AnimalAdoptionProcessProps {
  currentStep?: number;
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

const AnimalAdoptionProcess: React.FC<AnimalAdoptionProcessProps> = ({
  currentStep = 1,
}) => {
  const [activeStep, setActiveStep] = useState(currentStep);

  useEffect(() => {
    setActiveStep(currentStep);
  }, [currentStep]);

  const isStepCompleted = (stepId: number) => stepId < activeStep;
  const isStepActive = (stepId: number) => stepId === activeStep;

  return (
    <section className="py-12 bg-pink-50 relative overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2 font-rounded">
            Simple Adoption Process
          </h2>
          <p className="text-lg text-gray-600">
            Just 6 easy steps to bring your new best friend home
          </p>
          <div className="flex justify-center mt-2 space-x-2">
            <span className="text-red-500">🐾</span>
            <span className="text-red-500">🐾</span>
            <span className="text-red-500">🐾</span>
          </div>
        </div>

        {/* Desktop Zig-Zag Layout */}
        <div className="hidden lg:grid grid-cols-2 gap-x-32 gap-y-16 relative">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const completed = isStepCompleted(step.id);
            const active = isStepActive(step.id);

            return (
              <motion.div
                key={step.id}
                className={cn(
                  "relative bg-white border-2 rounded-2xl p-6 shadow-lg w-80",
                  active && "border-red-500 shadow-xl ring-4 ring-red-100",
                  completed && "border-green-500 ring-4 ring-green-100",
                  !active && !completed && "border-pink-200"
                )}
              >
                {/* Step Number Badge */}
                <div
                  className={cn(
                    "absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 bg-white shadow-md",
                    completed && "bg-green-500 border-green-500 text-white",
                    active && "bg-red-500 border-red-500 text-white",
                    !active && !completed && "bg-pink-100 border-pink-200 text-pink-600"
                  )}
                >
                  {step.id}
                </div>

                {/* Icon */}
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                    completed && "bg-green-500",
                    active && "bg-red-500",
                    !active && !completed && "bg-pink-100"
                  )}
                >
                  {completed ? (
                    <CheckCircle className="w-8 h-8 text-white" />
                  ) : (
                    <Icon
                      className={cn(
                        "w-8 h-8",
                        active ? "text-white" : "text-pink-600"
                      )}
                    />
                  )}
                </div>

                {/* Title */}
                <h3
                  className={cn(
                    "text-lg font-bold mb-2 font-rounded",
                    active && "text-red-600",
                    completed && "text-green-600",
                    !active && !completed && "text-gray-800"
                  )}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </motion.div>
            );
          })}

          {/* Zig-Zag Connecting Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Row 1: 1 → 2 */}
            <line x1="23%" y1="12%" x2="77%" y2="12%" stroke="#f87171" strokeWidth="2" />
            {/* Row 2: 2 → 3 */}
            <line x1="77%" y1="12%" x2="77%" y2="50%" stroke="#f87171" strokeWidth="2" />
            <line x1="77%" y1="50%" x2="23%" y2="50%" stroke="#f87171" strokeWidth="2" />
            {/* Row 3: 3 → 4 */}
            <line x1="23%" y1="50%" x2="23%" y2="88%" stroke="#f87171" strokeWidth="2" />
            <line x1="23%" y1="88%" x2="77%" y2="88%" stroke="#f87171" strokeWidth="2" />
          </svg>
        </div>

        {/* Mobile Vertical Layout (unchanged) */}
        <div className="lg:hidden space-y-6 mb-12">
          {processSteps.map((step) => {
            const Icon = step.icon;
            const completed = isStepCompleted(step.id);
            const active = isStepActive(step.id);

            return (
              <motion.div
                key={step.id}
                className={cn(
                  "relative bg-white border-2 rounded-2xl p-6 shadow-lg",
                  active && "border-red-500 shadow-xl ring-4 ring-red-100",
                  completed && "border-green-500 ring-4 ring-green-100",
                  !active && !completed && "border-pink-200"
                )}
              >
                {/* Step Number */}
                <div
                  className={cn(
                    "absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 bg-white shadow-md",
                    completed && "bg-green-500 border-green-500 text-white",
                    active && "bg-red-500 border-red-500 text-white",
                    !active && !completed && "bg-pink-100 border-pink-200 text-pink-600"
                  )}
                >
                  {step.id}
                </div>

                {/* Icon */}
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                    completed && "bg-green-500",
                    active && "bg-red-500",
                    !active && !completed && "bg-pink-100"
                  )}
                >
                  {completed ? (
                    <CheckCircle className="w-8 h-8 text-white" />
                  ) : (
                    <Icon
                      className={cn(
                        "w-8 h-8",
                        active ? "text-white" : "text-pink-600"
                      )}
                    />
                  )}
                </div>

                <h3
                  className={cn(
                    "text-lg font-bold mb-2 font-rounded",
                    active && "text-red-600",
                    completed && "text-green-600",
                    !active && !completed && "text-gray-800"
                  )}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Start Button */}
        <div className="text-center">
          <motion.button className="group bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-400 hover:scale-105 transition-all duration-300 hover:shadow-pink-200 hover:shadow-xl relative overflow-hidden">
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
