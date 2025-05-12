import React, { useEffect, useState } from "react";
import "./ExpensesTable.css";

const ExpensesTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("http://localhost:3000/withdraw");
        const data = await response.json();

        if (data.success) {
          setExpenses(data.withdraws);
        } else {
          setError(data.message || "Failed to fetch expenses");
        }
      } catch (err) {
        setError("Error fetching expenses");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="table-wrapper">
      <h3>Expenses Records</h3>
      <table className="donation-table">
        <thead>
          <tr>
            <th>Amount (PKR)</th>
            <th>Reason</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan={3}>No expenses found.</td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.Amount.toLocaleString()}</td>
                <td>{expense.Reason}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
