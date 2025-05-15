import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ManageAccount.css";
import AdminImg from "../../assets/Admin_img.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageAccount = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/Signup`, {
        name,
        email,
        password,
        role: "Admin",
      })
      .then((result) => {
        if (result.data.success) {
          toast.success("User registered successfully!");
          navigate("/dashboard");
        } else {
          toast.error(result.data.message || "Registration failed");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error creating admin account");
      });
  };

  return (
    <div className="manage-account-container">
      <div className="AdminImgCom">
        <h3>Account With Admin Privileges</h3>
        <img src={AdminImg} alt="" />
      </div>
      <div className="manage-account-card">
        <h2>Create Account </h2>
        <form onSubmit={handleSubmit} className="manage-account-form">
          <label>
            Full Name
            <input
              type="text"
              placeholder="Enter full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="manage-account-button">
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageAccount;
