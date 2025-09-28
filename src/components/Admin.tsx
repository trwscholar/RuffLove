import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase-client";
import AdminPanel from "./AdminPanel";
import EventPanel from "./EventPanel";
// import BillingPanel from "./BillingPanel";

function Admin() {
  const [activePanel, setActivePanel] = useState<"gallery" | "events" | "billing">("gallery");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActivePanel("gallery")}
          className={`px-4 py-2 rounded ${activePanel === "gallery" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Animal Gallery
        </button>
        <button
          onClick={() => setActivePanel("events")}
          className={`px-4 py-2 rounded ${activePanel === "events" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Event Gallery
        </button>
        <button
          onClick={() => setActivePanel("billing")}
          className={`px-4 py-2 rounded ${activePanel === "billing" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Billing
        </button>
      </div>

      {/* Panel Rendering */}
      <div className="border rounded-lg p-6 shadow-md bg-white">
        {activePanel === "gallery" && <AdminPanel />}
        {activePanel === "events" && <EventPanel />}
        {/* {activePanel === "billing" && <BillingPanel />} */}
      </div>
    </section>
  );
}

export default Admin;
