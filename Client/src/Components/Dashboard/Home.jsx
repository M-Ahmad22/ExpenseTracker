import React, { useState } from "react";

import BarChartComponent from "../Barchart/Barchart";
import ExpensesTable from "../Tables/ExpensesTable";
import DonationsTable from "../Tables/DonationsTable";
import Deposit from "../Dashboard/Deposit";
import Withdraw from "../Dashboard/Withdraw";
import GenerateReport from "../Dashboard/Report";
import "./Home.css";

const DashboardHome = () => {
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
  const [isWithDrawDialogOpen, setIsWithDrawDialogOpen] = useState(false);
  const [isGenerateReportDialogOpen, setIsGenerateReportDialogOpen] =
    useState(false);

  const openDepositDialog = () => setIsDepositDialogOpen(true);
  const closeDepositDialog = () => setIsDepositDialogOpen(false);

  const openWithDrawDialog = () => setIsWithDrawDialogOpen(true);
  const closeWithDrawDialog = () => setIsWithDrawDialogOpen(false);

  const openGenerateReportDialog = () => setIsGenerateReportDialogOpen(true);
  const closeGenerateReportDialog = () => setIsGenerateReportDialogOpen(false);

  return (
    <>
      <div className="HomeCon">
        <div className="Deposit-Withdraw">
          <div className="Deposit">
            <button onClick={openDepositDialog}>Deposit</button>
          </div>
          <div className="Withdraw">
            <button onClick={openWithDrawDialog}>Withdraw</button>
          </div>
          <div className="TotalAmount">
            <h1 className="TMH1">Total Amount = 502,432</h1>
          </div>
        </div>
        <div className="RepStatTransaction">
          <div className="StatReport">
            <div className="GenerateReport">
              <button onClick={openGenerateReportDialog}>
                Generate Report
              </button>
            </div>
            <div className="GeneralStatistics">
              <div style={{ width: "100%", flex: 1 }}>
                <BarChartComponent />
              </div>
            </div>
          </div>
          <div className="TransactionTable">
            <div className="RecentTransactions">
              <ExpensesTable />
            </div>
            <div className="RecentDonations">
              <DonationsTable />
            </div>
          </div>
        </div>
      </div>

      <Deposit isOpen={isDepositDialogOpen} onClose={closeDepositDialog} />
      <Withdraw isOpen={isWithDrawDialogOpen} onClose={closeWithDrawDialog} />
      <GenerateReport
        isOpen={isGenerateReportDialogOpen}
        onClose={closeGenerateReportDialog}
      />
    </>
  );
};

export default DashboardHome;
