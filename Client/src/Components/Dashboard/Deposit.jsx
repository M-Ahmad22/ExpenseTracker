import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Deposit.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Deposit = ({ isOpen, onClose, editId }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  // Form fields
  const [depositDate, setDepositDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [donatorName, setDonatorName] = useState("");

  // Fetch deposit data when editId changes (for edit mode)
  useEffect(() => {
    if (editId) {
      fetchDeposit(editId);
    } else {
      resetForm();
    }
    // eslint-disable-next-line
  }, [editId]);

  const fetchDeposit = async (id) => {
    try {
      const response = await fetch(`${API_URL}/deposit/${id}`);
      const data = await response.json();
      if (data.success && data.deposit) {
        setAmount(data.deposit.DepositAmount);
        setDonatorName(data.deposit.DonatorName);
        setDepositDate(new Date(data.deposit.date));
      } else {
        toast.error(data.message || "Deposit not found");
        resetForm();
      }
    } catch (error) {
      toast.error("Failed to fetch deposit");
      resetForm();
    }
  };

  const resetForm = () => {
    setAmount("");
    setDonatorName("");
    setDepositDate(new Date());
  };

  // Handle Add or Update submit
  const handleSubmit = async () => {
    if (!amount || !donatorName || !depositDate) {
      toast.error("All fields are required");
      return;
    }

    const depositData = {
      DepositAmount: Number(amount),
      DonatorName: donatorName,
      date: depositDate,
    };

    try {
      let response, result;
      if (editId) {
        // Update existing deposit
        response = await fetch(`${API_URL}/deposit/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(depositData),
        });
      } else {
        // Add new deposit
        response = await fetch(`${API_URL}/deposit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(depositData),
        });
      }

      result = await response.json();

      if (result.success) {
        resetForm();
        if (typeof isOpen === "boolean") onClose();
      } else {
        toast.error(result.message || "Failed to save deposit");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  // If used as modal
  if (typeof isOpen === "boolean") {
    if (!isOpen) return null;

    return (
      <>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editId ? "Edit Deposit" : "Deposit Amount"}</h2>
              <button
                className="close-btn"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                X
              </button>
            </div>
            <div className="modal-body">
              <input
                type="number"
                placeholder="Enter deposit amount"
                className="input-field"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <input
                type="text"
                placeholder="Donator Name"
                className="input-field"
                value={donatorName}
                onChange={(e) => setDonatorName(e.target.value)}
              />
              <div className="date-picker">
                <label>Deposit Date</label>
                <DatePicker
                  selected={depositDate}
                  onChange={(date) => setDepositDate(date)}
                  dateFormat="MMMM d, yyyy"
                  className="input-field"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="submit-btn" onClick={handleSubmit}>
                {editId ? "Update" : "Submit"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Page mode (not modal)
  const handleClose = () => {
    navigate("/Dashboard");
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="page-container">
        <div className="page-header">
          <h2>{editId ? "Edit Deposit" : "Deposit Amount"}</h2>
          <button
            className="close-btn"
            onClick={() => {
              resetForm();
              handleClose();
            }}
          >
            X
          </button>
        </div>
        <div className="page-body">
          <input
            type="number"
            placeholder="Enter deposit amount"
            className="input-field"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Donator Name"
            className="input-field"
            value={donatorName}
            onChange={(e) => setDonatorName(e.target.value)}
          />
          <div className="date-picker">
            <label>Deposit Date</label>
            <DatePicker
              selected={depositDate}
              onChange={(date) => setDepositDate(date)}
              dateFormat="MMMM d, yyyy"
              className="input-field"
            />
          </div>
        </div>
        <div className="page-footer">
          <button className="submit-btn" onClick={handleSubmit}>
            {editId ? "Update" : "Submit"}
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              resetForm();
              handleClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Deposit;
