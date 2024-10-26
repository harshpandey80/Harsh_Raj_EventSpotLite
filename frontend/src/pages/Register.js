// src/pages/Register.js
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
  // using useState for form handling because when we submit our browser don't neet to collect data from any variable or from here and there all the data is updated correctly
  const navigate = useNavigate(); // for navigation after success signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData); // sending request to backend from where our req get proccessed and user registed to this platform 
      toast.success("Registered successfully!");
      navigate("/login"); // after successfull request we navigate to login for user convenience
    } catch (error) {
      toast.error("Registration failed. Please try again."); // showig error in toast is caought;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80 transition-transform transform duration-300 hover:scale-105"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })// updating data on every new change like on submittion hame data na collect krna pade
            }
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
              // same as above
            }
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
