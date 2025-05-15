import React, { useState } from "react";
import "./Common.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ onSignupSuccess }) => {
  // const API_URL = process.env.REACT_APP_API_URL;
  const API_URL = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/Signup`, {
        name,
        email,
        password,
        role: "User",
      })

      .then((result) => {
        console.log(result);
        if (result.data.success) {
          console.log("API URL:", import.meta.env.VITE_API_URL);
          // toast.success("User registered successfully!");
          if (onSignupSuccess) onSignupSuccess();
        } else {
          toast.error(result.data.message || "Registration failed");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="signup-card">
        <div className="signup-card-header">
          <h1 className="signup-card-title">Create Account</h1>
          <p className="signup-card-description">
            Enter your details to create a new account
          </p>
        </div>
        <div className="signup-card-content">
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-form-group">
              <label htmlFor="name" className="signup-label">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter Your Name"
                required
                className="signup-input"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="email" className="signup-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="signup-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="password" className="signup-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="signup-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
