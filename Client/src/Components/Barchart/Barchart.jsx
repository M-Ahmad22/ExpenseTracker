import React, { useEffect, useState } from "react";
import BarChartComponent from "./DataBarChart";
import "./Barchart.css";

const getAllMonthsOfYear = (year) => {
  return Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  });
};

const ReportChartContainer = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAndAggregate = async () => {
      setLoading(true);
      try {
        const [withdrawRes, depositRes] = await Promise.all([
          fetch("http://localhost:3000/withdraw"),
          fetch("http://localhost:3000/deposit"),
        ]);

        const withdrawData = await withdrawRes.json();
        const depositData = await depositRes.json();

        if (!withdrawData.success || !depositData.success) {
          throw new Error("Failed to fetch data");
        }

        // Aggregate sums by month for selected year
        const expensesByMonth = {};
        withdrawData.withdraws.forEach(({ Amount, date }) => {
          const d = new Date(date);
          const dataYear = d.getFullYear();
          if (dataYear === year) {
            const month = d.toISOString().slice(0, 7);
            expensesByMonth[month] = (expensesByMonth[month] || 0) + Amount;
          }
        });

        const donationsByMonth = {};
        depositData.deposits.forEach(({ DepositAmount, date }) => {
          const d = new Date(date);
          const dataYear = d.getFullYear();
          if (dataYear === year) {
            const month = d.toISOString().slice(0, 7);
            donationsByMonth[month] =
              (donationsByMonth[month] || 0) + DepositAmount;
          }
        });

        // Generate all months for the selected year
        const months = getAllMonthsOfYear(year);

        // Build chart data with zeros for missing months
        const aggregatedData = months.map((month) => ({
          name: month,
          Donations: donationsByMonth[month] || 0,
          Expenses: expensesByMonth[month] || 0,
        }));

        setChartData(aggregatedData);
      } catch (err) {
        console.error(err);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndAggregate();
  }, [year]);

  return (
    <div>
      <div className="year-selector-container">
        <label htmlFor="year-select">Select Year:</label>
        <select
          id="year-select"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {[...Array(10)].map((_, i) => {
            const y = currentYear - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      {loading ? (
        <p>Loading chart data...</p>
      ) : (
        <BarChartComponent data={chartData} />
      )}
    </div>
  );
};

export default ReportChartContainer;
