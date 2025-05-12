import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import DepositDialog from "./Deposit";
import Deposit from "../Dashboard/Deposit";
import Withdraw from "../Dashboard/Withdraw";
import ExpenseReport from "../Dashboard/Withdraw";
import DonationReport from "../Dashboard/Deposit";
import Report from "../Dashboard/Report";
import NavLogo from "../../assets/3d-mosque-white-gold-islamic-perspective-free-png.webp";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/");
    }, 1500);
    navigate("/");
    localStorage.clear();
    localStorage.removeItem("token");
  };
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const SidebarLinks = () => (
    <div className="DashboardLinks">
      <div className="LinksCon">
        <Link to="DashboardHome" onClick={() => setSidebarOpen(false)}>
          Home
        </Link>
        <Link to="Deposit" onClick={() => setSidebarOpen(false)}>
          Deposit
        </Link>
        <Link to="Withdraw" onClick={() => setSidebarOpen(false)}>
          Withdraw
        </Link>
        <Link to="ExpenseReport" onClick={() => setSidebarOpen(false)}>
          Expense Report
        </Link>
        <Link to="DonationReport" onClick={() => setSidebarOpen(false)}>
          Donation Report
        </Link>
        <Link to="Report" onClick={() => setSidebarOpen(false)}>
          Report
        </Link>
        <Link to="ManageAccount" onClick={() => setSidebarOpen(false)}>
          Manage Account
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <div className="DashboardCon">
        <div className="Sidebar">
          <SidebarLinks />
        </div>

        <div className={`SidebarDrawer ${sidebarOpen ? "open" : ""}`}>
          <button
            className="SidebarClose"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX size={28} />
          </button>
          <SidebarLinks />
        </div>

        <div className="CenterCon">
          <div className="NavBar">
            <button
              className="SidebarHamburger"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <FiMenu size={34} />
            </button>
            <div className="NavLogo">
              <img src={NavLogo} alt="" />
            </div>
            <div className="NavText">Expense Tracker</div>
            <div className="AccountLogout">
              <button className="logout-btn" onClick={handleLogout}>
                <FiLogOut size={20} style={{ marginRight: "8px" }} />
                Logout
              </button>
            </div>
          </div>

          <div className="HomeSection">
            <Outlet />
          </div>
          <div className="Footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
