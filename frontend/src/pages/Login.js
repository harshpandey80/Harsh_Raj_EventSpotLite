// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./Login.css"; 

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  // using useState for form handling because when we submit our browser don't neet to collect data from any variable or from here and there all the data is updated correctly
  const { login } = useAuth(); //from context api to call for login and process request
  const navigate = useNavigate(); // for nevigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);  // sending request to backend to validate data;
      login(data.token); // exatracting jwt token from reqponse got from backend 
      toast.success("Login Success");
      navigate("/"); // if login success we nevigate to home 
    } catch (error) {
      toast.error("Login failed, please try again!");
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Welcome Back!</h2>
        <div className="input-group">
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="input-field"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="input-field"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <p className="login-footer">
          Don't have an account?{" "}
          <Link
            to="/register"
            // onClick={handleLinkClick}
            className="text-blue-900 hover:text-blue-500 transition duration-300 py-2"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
