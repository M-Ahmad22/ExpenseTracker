// import React, { useEffect, useState } from "react";
// import "./ExpensesTable.css";

// const ExpensesTable = () => {
//   const API_URL = import.meta.env.VITE_API_URL;

//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const response = await fetch(`${API_URL}/withdraw`);
//         const data = await response.json();

//         if (data.success) {
//           setExpenses(data.withdraws);
//         } else {
//           setError(data.message || "Failed to fetch expenses");
//         }
//       } catch (err) {
//         setError("Error fetching expenses");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExpenses();
//   }, []);

//   if (loading) return <p>Loading expenses...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div className="table-wrapper">
//       <h3>Expenses Records</h3>
//       <table className="donation-table">
//         <thead>
//           <tr>
//             <th>Amount (PKR)</th>
//             <th>Reason</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expenses.length === 0 ? (
//             <tr>
//               <td colSpan={3}>No expenses found.</td>
//             </tr>
//           ) : (
//             expenses.map((expense) => (
//               <tr key={expense._id}>
//                 <td>{expense.Amount.toLocaleString()}</td>
//                 <td>{expense.Reason}</td>
//                 <td>{new Date(expense.date).toLocaleDateString()}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExpensesTable;
import React, { useEffect, useState, useRef } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Withdraw from "../Dashboard/Withdraw"; // Your modal component for add/edit
import "./ExpensesTable.css";

const ExpensesTable = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editExpense, setEditExpense] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/withdraw`);
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

  const handleEditClick = (expense) => {
    setEditExpense(expense);
    setModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        const response = await fetch(`${API_URL}/withdraw/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        if (result.success) {
          setExpenses(expenses.filter((e) => e._id !== id));
        } else {
          alert(result.message || "Failed to delete expense");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting expense");
      }
    }
  };

  const handleModalSave = (updatedExpense) => {
    setModalOpen(false);
    setEditExpense(null);
    setExpenses((prev) =>
      prev.map((e) => (e._id === updatedExpense._id ? updatedExpense : e))
    );
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditExpense(null);
  };

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
            <th>Actions</th> {/* New Actions column */}
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan={4}>No expenses found.</td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.Amount.toLocaleString()}</td>
                <td>{expense.Reason}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td className="actions-flex">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEditClick(expense)}
                    aria-label="Edit"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteClick(expense._id)}
                    aria-label="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {modalOpen && (
        <Withdraw
          isOpen={modalOpen}
          onClose={handleModalClose}
          expenseToEdit={editExpense}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
};

export default ExpensesTable;
