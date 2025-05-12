import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Deposit.css";
import { useNavigate } from "react-router-dom";

// Import toast and ToastContainer
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Deposit = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [depositDate, setDepositDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [donatorName, setDonatorName] = useState("");

  if (typeof isOpen === "boolean") {
    if (!isOpen) return null;

    const handleSubmit = async () => {
      const depositData = {
        DepositAmount: Number(amount),
        DonatorName: donatorName,
        date: depositDate,
      };

      try {
        const response = await fetch("http://localhost:3000/deposit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(depositData),
        });

        const result = await response.json();
        if (result.success) {
          toast.success("Deposit submitted successfully!");
          setAmount("");
          setDonatorName("");
          setDepositDate(new Date());
          setTimeout(() => {
            navigate("/Dashboard");
          }, 1500);
        } else {
          toast.error(result.message || "Failed to submit deposit");
        }
      } catch (error) {
        toast.error("Failed to submit deposit");
      }
      onClose();
    };

    return (
      <>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Deposit Amount</h2>
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
                Submit
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

  const handleSubmit = async () => {
    const depositData = {
      DepositAmount: Number(amount),
      DonatorName: donatorName,
      date: depositDate,
    };

    try {
      const response = await fetch("http://localhost:3000/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(depositData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Deposit submitted successfully!");
        setAmount("");
        setDonatorName("");
        setDepositDate(new Date());
        setTimeout(() => {
          navigate("/Dashboard");
        }, 1500);
      } else {
        toast.error(result.message || "Failed to submit deposit");
      }
    } catch (error) {
      toast.error("Failed to submit deposit");
    }
  };

  const handleClose = () => {
    navigate("/Dashboard");
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="page-container">
        <div className="page-header">
          <h2>Deposit Amount</h2>
          <button className="close-btn" onClick={handleClose}>
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
            Submit
          </button>
          <button className="cancel-btn" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Deposit;
