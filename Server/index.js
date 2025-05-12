const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authSchema = require("./Models/Auth");
const withdrawModel = require("./Models/Withdraw");
const depositModel = require("./Models/Deposit");
const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
const JWT_SECRET = process.env.JWT_SECRET;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo db connected"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Backend API is running.");
});

app.post("/Signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await authSchema.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await authSchema.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.json({
      success: true,
      message: "User Registered Successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.json({ success: false, message: "Error Registering User", err });
  }
});

app.post("/Login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log("Login Request:", req.body);

    const user = await authSchema.findOne({ email, role });
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Password is Incorrect" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      success: true,
      message: "User Logged In Successfully",
      token,
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Deposit route
app.post("/deposit", async (req, res) => {
  try {
    const { DepositAmount, DonatorName, date } = req.body;
    if (!DepositAmount || !DonatorName || !date) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newDeposit = new depositModel({
      DepositAmount,
      DonatorName,
      date: new Date(date),
    });
    await newDeposit.save();
    res.json({
      success: true,
      message: "Deposit added successfully",
      deposit: newDeposit,
    });
  } catch (error) {
    console.error("Error adding deposit:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Withdraw route
app.post("/withdraw", async (req, res) => {
  try {
    const { Amount, Reason, date } = req.body;
    if (!Amount || !Reason || !date) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newWithdraw = new withdrawModel({
      Amount,
      Reason,
      date: new Date(date),
    });
    await newWithdraw.save();
    res.json({
      success: true,
      message: "Withdraw saved successfully",
      withdraw: newWithdraw,
    });
  } catch (error) {
    console.error("Error saving withdraw:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get deposits
app.get("/deposit", async (req, res) => {
  try {
    const deposits = await depositModel.find().sort({ date: -1 });
    res.json({ success: true, deposits });
  } catch (error) {
    console.error("Error fetching deposits:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get withdraws
app.get("/withdraw", async (req, res) => {
  try {
    const withdraws = await withdrawModel.find().sort({ date: -1 });
    res.json({ success: true, withdraws });
  } catch (error) {
    console.error("Error fetching withdraws:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });
module.exports = app; // <-- Add this line
