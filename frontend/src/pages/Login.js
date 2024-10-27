import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./Login.css"; 

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      login(data.token);
      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed, please try again!");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Welcome Back!</h2>
        <div className="input-group">
          <label htmlFor="email" className="input-label">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="input-field"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="input-label">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="input-field"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <p className="login-footer">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
