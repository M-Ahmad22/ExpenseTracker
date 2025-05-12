import React, { useEffect, useState } from "react";
import "./DonationsTable.css";

const DonationsTable = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://localhost:3000/deposit");
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

    fetchDonations();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {donations.length === 0 ? (
            <tr>
              <td colSpan={3}>No donations found.</td>
            </tr>
          ) : (
            donations.map((donation) => (
              <tr key={donation._id}>
                <td>{donation.DonatorName}</td>
                <td>{donation.DepositAmount.toLocaleString()}</td>
                <td>{new Date(donation.date).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonationsTable;
