import { TransactionServices } from "../services/transaction.services.js";
import { validationResult } from "express-validator";

const deposit = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { amount, donatorName } = req.body;
    const userId = req.user._id;
    
    const transaction = await TransactionServices.deposit(amount, donatorName, userId);
    if (!transaction) {
      return res.status(400).json({ message: "Transaction failed" });
    }
    res.status(200).json({
      success: true,
      message: "Transaction Deposited successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const withdraw = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { amount, reason } = req.body;
    const userId = req.user._id;
    
    const transaction = await TransactionServices.withdraw(amount, reason, userId);
    if (!transaction) {
      return res.status(400).json({ message: "Transaction failed" });
    }
    res.status(200).json({
      success: true,
      message: "Transaction Withdrawed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const allDeposit = async (req, res) => {
  try {
    const userId = req.user._id;
    const deposits = await TransactionServices.allDeposit(userId);
    res.status(200).json({
      success: true,
      message: "All Deposits",
      deposits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get all deposits",
    });
  }
};

const allWithdraw = async (req, res) => {
  try {
    const userId = req.user._id;
    const withdraws = await TransactionServices.allWithdraw(userId);
    res.status(200).json({
      success: true,
      message: "All Withdrawals",
      withdraws,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get all withdrawals",
    });
  }
};

export const TransactionController = {
  deposit,
  withdraw,
  allDeposit,
  allWithdraw,
};
