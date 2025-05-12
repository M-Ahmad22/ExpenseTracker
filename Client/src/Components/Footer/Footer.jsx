import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} MATalogics. All rights reserved.
    </footer>
  );
};

export default Footer;
