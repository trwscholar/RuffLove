import React from "react";
import { Heart, FileText, Home, CreditCard, Car, MessageSquare } from "lucide-react";

const processSteps = [
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

const AnimalAdoptionProcess = () => {
  return (
    <section className="py-12 bg-pink-50 relative">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Simple Adoption Process</h2>
        <p className="text-lg text-gray-600">Just 6 easy steps to bring your new best friend home</p>
        <div className="mt-2">🐾🐾🐾</div>
      </div>

      {/* Zigzag Layout */}
      <div className="relative w-full max-w-5xl mx-auto">
        {processSteps.map((step, idx) => {
          const Icon = step.icon;
          const isLeft = idx % 2 === 0; // alternate zigzag
          return (
            <div
              key={step.id}
              className={`flex items-center mb-16 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
            >
              {/* Step Card */}
              <div className="relative bg-white rounded-xl shadow-md p-6 w-80 border border-pink-200">
                {/* Number Badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold shadow">
                  {step.id}
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-pink-600" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>

              {/* Connector */}
              {idx < processSteps.length - 1 && (
                <div className="flex-1 relative h-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-1/2 left-0 w-full h-20"
                    viewBox="0 0 200 100"
                    preserveAspectRatio="none"
                  >
                    {isLeft ? (
                      <path
                        d="M 200 10 C 100 100, 100 0, 0 90"
                        stroke="#f87171"
                        strokeWidth="2"
                        fill="transparent"
                      />
                    ) : (
                      <path
                        d="M 0 10 C 100 100, 100 0, 200 90"
                        stroke="#f87171"
                        strokeWidth="2"
                        fill="transparent"
                      />
                    )}
                  </svg>
                </div>
              )}
            </div>
          );
        })}

        {/* Button */}
        <div className="text-center mt-12">
          <button className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-400 transition">
            Start Adoption Process 🐾
          </button>
        </div>
      </div>
    </section>
  );
};

export default AnimalAdoptionProcess;
