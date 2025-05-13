import express from "express";
import { body } from "express-validator";
import { TransactionController } from "../controllers/transaction.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
  "/add-deposit", 
  [
    body("amount")
      .isFloat({ min: 0.01 })
      .withMessage("Amount must be greater than 0"),
    body("donatorName")
      .isLength({ min: 3 })
      .withMessage("Donator name must be at least 3 characters long")
      .trim()
      .escape()
  ],
  authMiddleware, 
  TransactionController.deposit
);

router.post(
  "/add-withdraw", 
  [
    body("amount")
      .isFloat({ min: 0.01 })
      .withMessage("Amount must be greater than 0"),
    body("reason")
      .isLength({ min: 3 })
      .withMessage("Reason must be at least 3 characters long")
      .trim()
      .escape()
  ],
  authMiddleware, 
  TransactionController.withdraw
);

router.get("/all-deposit", authMiddleware, TransactionController.allDeposit);
router.get("/all-withdraw", authMiddleware, TransactionController.allWithdraw);

export default router;
