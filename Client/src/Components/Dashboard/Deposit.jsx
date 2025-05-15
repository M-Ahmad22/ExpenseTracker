import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Deposit.css";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Deposit = ({ isOpen, onClose, depositToEdit = null, onSave }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [depositDate, setDepositDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [donatorName, setDonatorName] = useState("");

  useEffect(() => {
    if (depositToEdit) {
      setAmount(depositToEdit.DepositAmount);
      setDonatorName(depositToEdit.DonatorName);
      setDepositDate(new Date(depositToEdit.date));
    } else {
      setAmount("");
      setDonatorName("");
      setDepositDate(new Date());
    }
  }, [depositToEdit]);

  if (typeof isOpen === "boolean") {
    if (!isOpen) return null;

    const handleSubmit = async () => {
      if (!amount || !donatorName) {
        toast.error("Please fill all fields");
        return;
      }

      const depositData = {
        DepositAmount: Number(amount),
        DonatorName: donatorName,
        date: depositDate.toISOString(),
      };

      try {
        let response;
        if (depositToEdit) {
          // Edit existing deposit
          response = await fetch(`${API_URL}/deposit/${depositToEdit._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(depositData),
          });
        } else {
          // New deposit
          response = await fetch(`${API_URL}/deposit`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(depositData),
          });
        }

        const result = await response.json();
        if (result.success) {
          toast.success(
            depositToEdit
              ? "Deposit updated successfully!"
              : "Deposit submitted successfully!"
          );
          if (onSave) onSave(result.deposit);
          onClose();
        } else {
          toast.error(result.message || "Failed to submit deposit");
        }
      } catch (error) {
        toast.error("Failed to submit deposit");
      }
    };

    return (
      <>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{depositToEdit ? "Edit Deposit" : "Deposit Amount"}</h2>
              <button className="close-btn" onClick={onClose}>
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
                {depositToEdit ? "Save Changes" : "Submit"}
              </button>
              <button className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Page mode submit unchanged
  const handleSubmit = async () => {
    // ... your existing page mode submit logic
  };

  const handleClose = () => {
    navigate("/Dashboard");
  };

  return <>{/* Your existing page mode UI */}</>;
};

export default Deposit;
