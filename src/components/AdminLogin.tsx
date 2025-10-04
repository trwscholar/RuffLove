import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase-client";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      console.log("Logged in user:", data.user);
      console.log("Session:", data.session);

      navigate("/admin"); 
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header with Back to Home button */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-end items-center">
          <button
            onClick={handleBackToHome}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-md space-y-4 w-80"
          autoComplete="off"
        >
          <h2 className="text-xl font-bold">Admin Login</h2>
          {message && <p className="text-red-500">{message}</p>}
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
            autoComplete="new-email"
            name="admin-email"
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
            autoComplete="new-password"
            name="admin-password"
          />
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;