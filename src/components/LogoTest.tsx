import React from "react";
import ruffLogo from "../assets/rufflovelogo.png";

const LogoTest = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-200">
      <h1 className="mb-6 text-2xl font-bold">Logo Test</h1>
      <img
        src={ruffLogo}
        alt="Ruff Love Logo Test"
        className="max-h-40 w-auto object-contain bg-white p-4 border border-red-500 rounded-md"
      />
      <p className="mt-4 text-gray-700">If this logo looks cropped, the PNG itself has extra whitespace or issues.</p>
    </div>
  );
};

export default LogoTest;
