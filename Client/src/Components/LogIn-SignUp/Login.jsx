import React, { useState } from "react";
import "./Common.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import toast and ToastContainer
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onToggleForm }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/login`, { email, password, role })
      .then((result) => {
        if (result.data.success && role === "Admin") {
          localStorage.setItem("token", result.data.token);
          toast.success("Login successful!");
          navigate("/Dashboard");
        } else {
          toast.error(result.data.message || "Login failed");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <div className="login-container">
      {/* ToastContainer must be rendered */}
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="login-card">
        <div className="login-card-header">
          <h1 className="login-card-title">Login</h1>
          <p className="login-card-description">
            Enter your email and password to login to your account
          </p>
        </div>
        <div className="login-card-content">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="email" className="login-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="login-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password" className="login-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="login-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
