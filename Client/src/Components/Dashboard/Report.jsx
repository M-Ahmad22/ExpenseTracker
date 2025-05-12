import React, { useState, useEffect } from "react";
import ExpensesTable from "../Tables/ExpensesTable";
import DonationsTable from "../Tables/DonationsTable";
import "./Report.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Report = ({ isOpen, onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);

  const [allExpenses, setAllExpenses] = useState([]);
  const [allDonations, setAllDonations] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/withdraw`)
      .then((res) => setAllExpenses(res.data.withdraws || []))
      .catch((err) => console.error("Failed to fetch expenses:", err));

    axios
      .get(`${API_URL}/deposit`)
      .then((res) => setAllDonations(res.data.deposits || []))
      .catch((err) => console.error("Failed to fetch donations:", err));
  }, []);

  useEffect(() => {
    if (!selectedMonth) {
      setFilteredExpenses([]);
      setFilteredDonations([]);
      setTotalExpenses(0);
      setTotalDonations(0);
      return;
    }

    const [year, month] = selectedMonth.split("-");
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const filteredExp = allExpenses.filter((exp) => {
      const expDate = new Date(exp.date);
      return expDate >= startDate && expDate < endDate;
    });
    setFilteredExpenses(filteredExp);

    const filteredDon = allDonations.filter((dep) => {
      const depDate = new Date(dep.date);
      return depDate >= startDate && depDate < endDate;
    });
    setFilteredDonations(filteredDon);

    const totalExpAmount = filteredExp.reduce(
      (sum, exp) => sum + Number(exp.Amount || 0),
      0
    );
    const totalDonAmount = filteredDon.reduce(
      (sum, dep) => sum + Number(dep.DepositAmount || 0),
      0
    );

    setTotalExpenses(totalExpAmount);
    setTotalDonations(totalDonAmount);
  }, [selectedMonth, allExpenses, allDonations]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClosebtn = () => {
    navigate("/Dashboard");
  };

  if (typeof isOpen === "boolean") {
    if (!isOpen) return null;

    return (
      <div className="generate-report-overlay">
        <div className="generate-report-container">
          <h2>Generate Report</h2>
          <div className="month-selection">
            <label htmlFor="month">Select Month:</label>
            <input
              type="month"
              id="month"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          </div>

          <div className="tables">
            <div className="expenses-table">
              <h3>Expenses</h3>
              <ExpensesTable data={filteredExpenses} />
              <p>Total Expenses: {totalExpenses.toLocaleString()}</p>
            </div>
            <div className="donations-table">
              <h3>Donations</h3>
              <DonationsTable data={filteredDonations} />
              <p>Total Donations: {totalDonations.toLocaleString()}</p>
            </div>
          </div>

          <div className="report-actions">
            <button onClick={handlePrint}>Print / Download</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  const handleClose = () => {
    navigate("/Dashboard");
  };

  return (
    <div className="generate-report-page-container">
      <div className="page-header">
        <h2>Generate Report</h2>
      </div>
      <div className="month-selection">
        <label htmlFor="month">Select Month:</label>
        <input
          type="month"
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </div>

      <div className="tables">
        <div className="expenses-table">
          <h3>Expenses</h3>
          <ExpensesTable data={filteredExpenses} />
          <p>Total Expenses: {totalExpenses.toLocaleString()}</p>
        </div>
        <div className="donations-table">
          <h3>Donations</h3>
          <DonationsTable data={filteredDonations} />
          <p>Total Donations: {totalDonations.toLocaleString()}</p>
        </div>
      </div>

      <div className="report-actions">
        <button onClick={handlePrint}>Print / Download</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Report;
