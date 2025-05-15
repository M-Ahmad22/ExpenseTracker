import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Deposit from "../Dashboard/Deposit"; // Adjust path as needed
import "./DonationsTable.css";

const DonationsTable = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editDonation, setEditDonation] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/deposit`);
      const data = await response.json();
      if (data.success) {
        setDonations(data.deposits);
      } else {
        setError(data.message || "Failed to fetch donations");
      }
    } catch (err) {
      setError("Error fetching donations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (donation) => {
    setEditDonation(donation);
    setModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      try {
        const response = await fetch(`${API_URL}/deposit/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        if (result.success) {
          setDonations(donations.filter((d) => d._id !== id));
        } else {
          alert(result.message || "Failed to delete donation");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting donation");
      }
    }
  };

  const handleModalSave = (updatedDeposit) => {
    setModalOpen(false);
    setEditDonation(null);
    setDonations((prev) =>
      prev.map((d) => (d._id === updatedDeposit._id ? updatedDeposit : d))
    );
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditDonation(null);
  };

  if (loading) return <p>Loading donations...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="table-wrapper">
      <h3>Donation Records</h3>
      <table className="donation-table">
        <thead>
          <tr>
            <th>Donor Name</th>
            <th>Amount (PKR)</th>
            <th>Date</th>
            <th>Actions</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {donations.length === 0 ? (
            <tr>
              <td colSpan={4}>No donations found.</td>
            </tr>
          ) : (
            donations.map((donation) => (
              <tr key={donation._id}>
                <td>{donation.DonatorName}</td>
                <td>{donation.DepositAmount.toLocaleString()}</td>
                <td>{new Date(donation.date).toLocaleDateString()}</td>
                <td className="actions-flex">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEditClick(donation)}
                    aria-label="Edit"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteClick(donation._id)}
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
        <Deposit
          isOpen={modalOpen}
          onClose={handleModalClose}
          depositToEdit={editDonation}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
};

export default DonationsTable;
