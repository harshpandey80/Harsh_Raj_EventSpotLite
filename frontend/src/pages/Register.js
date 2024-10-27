import React, { useState } from "react";
import { register as registerUser } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 bg-opacity-90 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-80
                   transition-transform duration-300 hover:scale-105 border border-indigo-500/20"
      >
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6 animate-pulse">Register</h2>
        <input
          type="text"
          placeholder="Username"
          className="mb-4 w-full px-4 py-2 text-cyan-300 bg-gray-900 bg-opacity-80 border border-cyan-500 
                     rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 placeholder-gray-500"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full px-4 py-2 text-cyan-300 bg-gray-900 bg-opacity-80 border border-cyan-500 
                     rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 placeholder-gray-500"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full px-4 py-2 text-cyan-300 bg-gray-900 bg-opacity-80 border border-cyan-500 
                     rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 placeholder-gray-500"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="w-full py-2 text-lg font-semibold text-black bg-gradient-to-r from-cyan-400 via-pink-500 to-indigo-500
                     rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:from-pink-500 hover:to-cyan-400"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
