import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Withdraw.css";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Withdraw = ({ isOpen, onClose, editId }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [WithdrawDate, setWithdrawDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [Reason, setReason] = useState("");

  // Fetch withdraw data when editId changes
  useEffect(() => {
    if (editId) {
      fetchWithdraw(editId);
    } else {
      resetForm();
    }
  }, [editId]);

  const fetchWithdraw = async (id) => {
    try {
      const response = await fetch(`${API_URL}/withdraw/${id}`);
      const data = await response.json();
      if (data.success && data.withdraw) {
        setAmount(data.withdraw.Amount);
        setReason(data.withdraw.Reason);
        setWithdrawDate(new Date(data.withdraw.date));
      } else {
        toast.error(data.message || "Withdraw not found");
        resetForm();
      }
    } catch (error) {
      toast.error("Failed to fetch withdraw");
      resetForm();
    }
  };

  const resetForm = () => {
    setAmount("");
    setReason("");
    setWithdrawDate(new Date());
  };

  const handleSubmit = async () => {
    if (!amount || !Reason) {
      toast.error("Please fill all fields");
      return;
    }

    const withdrawData = {
      Amount: Number(amount),
      Reason,
      date: WithdrawDate.toISOString(),
    };

    try {
      let response, result;

      if (editId) {
        response = await fetch(`${API_URL}/withdraw/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(withdrawData),
        });
      } else {
        response = await fetch(`${API_URL}/withdraw`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(withdrawData),
        });
      }

      result = await response.json();

      if (result.success) {
        resetForm();
        if (typeof isOpen === "boolean") onClose();
      } else {
        toast.error(result.message || "Failed to save withdraw");
      }
    } catch (error) {
      toast.error("Failed to submit withdraw. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!editId) {
      toast.error("No withdraw selected to delete");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this withdraw?"))
      return;

    try {
      const response = await fetch(`${API_URL}/withdraw/${editId}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.success) {
        resetForm();
        if (typeof isOpen === "boolean") onClose();
      } else {
        toast.error(result.message || "Failed to delete withdraw");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  if (typeof isOpen === "boolean") {
    if (!isOpen) return null;

    return (
      <>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editId ? "Edit Withdraw" : "Withdraw Amount"}</h2>
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
                type="text"
                placeholder="Reason"
                className="input-field"
                value={Reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <input
                type="number"
                placeholder="Enter Amount"
                className="input-field"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="date-picker">
                <label>Withdraw Date</label>
                <DatePicker
                  selected={WithdrawDate}
                  onChange={(date) => setWithdrawDate(date)}
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

  const handleClose = () => {
    navigate("/Dashboard");
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="page-container">
        <div className="page-header">
          <h2>{editId ? "Edit Withdraw" : "Withdraw Amount"}</h2>
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
            type="text"
            placeholder="Reason"
            className="input-field"
            value={Reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Amount"
            className="input-field"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="date-picker">
            <label>Withdraw Date</label>
            <DatePicker
              selected={WithdrawDate}
              onChange={(date) => setWithdrawDate(date)}
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

export default Withdraw;
