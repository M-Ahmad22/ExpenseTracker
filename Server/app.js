import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";

const app = express();
connectDB();
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later" }
});
app.use("/backend/api/v1/", limiter);

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts, please try again later" }
});
app.use("/backend/api/v1/user/login", authLimiter);
app.use("/backend/api/v1/user/signup", authLimiter);

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/backend/api/v1/user", userRoutes);
app.use("/backend/api/v1/transaction", transactionRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource not found"
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

export default app;
