const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./Routes/authRoutes");
const depositRoutes = require("./Routes/depositRoutes");
const withdrawRoutes = require("./Routes/withdrawRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,

    // origin: "https://fintrackx.vercel.app",

    origin: "https://expensetracker-clientside.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo db connected"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Backend API is running.");
});

// Use route modules
app.use("/auth", authRoutes);
app.use("/deposit", depositRoutes);
app.use("/withdraw", withdrawRoutes);

module.exports = app;
