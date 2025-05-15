import React, { useEffect } from "react";
import Home from "./Components/Home/Home";
import Login from "./Components/LogIn-SignUp/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/LogIn-SignUp/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import DashboardHome from "./Components/Dashboard/Home";
import Deposit from "./Components/Dashboard/Deposit";
import Withdraw from "./Components/Dashboard/Withdraw";
import ExpenseReport from "./Components/Tables/ExpensesTable";
import DonationReport from "./Components/Tables/DonationsTable";
import Report from "./Components/Dashboard/Report";
import ManageAccount from "./Components/ManageAccount/ManageAccount";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ToastTest from "./Components/ToastTest";
import axios from "axios";

import "./App.css";
const App = () => {
  // Set up Axios defaults
  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    axios.defaults.withCredentials = true;
    console.log("Axios defaults set to:", axios.defaults.baseURL);
  }, []);
  return (
    <div>
      <>
        <Router>
          <ToastContainer
            position="bottom-right " // <-- Change position here
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={<ToastTest />} /> */}
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/Dashboard" element={<Dashboard />}>
                <Route index element={<DashboardHome />} />
                <Route path="DashboardHome" element={<DashboardHome />} />
                <Route path="Deposit" element={<Deposit />} />
                <Route path="Withdraw" element={<Withdraw />} />
                <Route path="ExpenseReport" element={<ExpenseReport />} />
                <Route path="DonationReport" element={<DonationReport />} />
                <Route path="Report" element={<Report />} />
                <Route path="ManageAccount" element={<ManageAccount />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </>
    </div>
  );
};

export default App;
