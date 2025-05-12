import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Withdraw.css";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Withdraw = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [WithdrawDate, setWithdrawDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [Reason, setReason] = useState("");

  if (typeof isOpen === "boolean") {
    if (!isOpen) return null;

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
        const response = await fetch("http://localhost:3000/withdraw", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(withdrawData),
        });

        const result = await response.json();

        if (result.success) {
          toast.success("Withdraw saved successfully!");
          onClose();
        } else {
          toast.error(
            "Error: " + (result.message || "Failed to save withdraw")
          );
        }
      } catch (error) {
        console.error("Withdraw submit error:", error);
        toast.error("Failed to submit withdraw. Please try again.");
      }
      onClose();
    };

    return (
      <>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Withdraw Amount</h2>
              <button className="close-btn" onClick={onClose}>
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
      const response = await fetch("http://localhost:3000/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(withdrawData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Withdraw saved successfully!");
        setTimeout(() => {
          navigate("/Dashboard");
        }, 1500);
      } else {
        toast.error("Error: " + (result.message || "Failed to save withdraw"));
      }
    } catch (error) {
      console.error("Withdraw submit error:", error);
      toast.error("Failed to submit withdraw. Please try again.");
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
          <h2>Withdraw Amount</h2>
          <button className="close-btn" onClick={handleClose}>
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

export default Withdraw;
