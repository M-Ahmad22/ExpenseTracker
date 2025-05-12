import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastTest = () => {
  const notify = () => toast.success("This is a test toast!");

  return (
    <div style={{ padding: 20 }}>
      <button onClick={notify}>Show Toast</button>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ToastTest;
