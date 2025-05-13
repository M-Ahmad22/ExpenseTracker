import Transaction from "../models/transaction.model.js";

const deposit = async (amount, donatorName, userId) => {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }
  if (!donatorName) {
    throw new Error("Donator name is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }
  const newDeposit = new Transaction({
    amount,
    donatorName,
    type: "deposit",
    date: new Date(),
    userId
  });
  await newDeposit.save();
  return newDeposit;
};

const withdraw = async (amount, reason, userId) => {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }
  if (!reason) {
    throw new Error("Reason is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }
  const newWithdraw = new Transaction({
    amount,
    reason,
    type: "withdrawal",
    date: new Date(),
    userId
  });
  await newWithdraw.save();
  return newWithdraw;
};

const allDeposit = async (userId) => {
  try {
    const deposits = await Transaction.find({ type: "deposit", userId });
    return deposits;
  } catch (error) {
    throw new Error("Failed to get all deposits");
  }
};

const allWithdraw = async (userId) => {
  try {
    const withdrawals = await Transaction.find({ type: "withdrawal", userId });
    return withdrawals;
  } catch (error) {
    throw new Error("Failed to get all withdrawals");
  }
};
export const TransactionServices = {
  deposit,
  withdraw,
  allDeposit,
  allWithdraw,
};
