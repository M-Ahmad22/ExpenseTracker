const depositModel = require("../Models/Deposit");

exports.addDeposit = async (req, res) => {
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
};

exports.getDeposits = async (req, res) => {
  try {
    const deposits = await depositModel.find().sort({ date: -1 });
    res.json({ success: true, deposits });
  } catch (error) {
    console.error("Error fetching deposits:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateDeposit = async (req, res) => {
  try {
    const { id } = req.params;
    const { DepositAmount, DonatorName, date } = req.body;
    if (!DepositAmount || !DonatorName || !date) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const updatedDeposit = await depositModel.findByIdAndUpdate(
      id,
      { DepositAmount, DonatorName, date: new Date(date) },
      { new: true }
    );
    if (!updatedDeposit) {
      return res
        .status(404)
        .json({ success: false, message: "Deposit not found" });
    }
    res.json({
      success: true,
      message: "Deposit updated successfully",
      deposit: updatedDeposit,
    });
  } catch (error) {
    console.error("Error updating deposit:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteDeposit = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await depositModel.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Deposit not found" });
    }
    res.json({ success: true, message: "Deposit deleted successfully" });
  } catch (error) {
    console.error("Error deleting deposit:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getDepositById = async (req, res) => {
  try {
    const { id } = req.params;
    const deposit = await depositModel.findById(id);
    if (!deposit) {
      return res
        .status(404)
        .json({ success: false, message: "Deposit not found" });
    }
    res.json({ success: true, deposit });
  } catch (error) {
    console.error("Error fetching deposit by id:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
