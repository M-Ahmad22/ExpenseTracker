const withdrawModel = require("../Models/Withdraw");

exports.addWithdraw = async (req, res) => {
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
};

exports.getWithdraws = async (req, res) => {
  try {
    const withdraws = await withdrawModel.find().sort({ date: -1 });
    res.json({ success: true, withdraws });
  } catch (error) {
    console.error("Error fetching withdraws:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteWithdraw = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await withdrawModel.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Withdraw not found" });
    }
    res.json({ success: true, message: "Withdraw deleted successfully" });
  } catch (error) {
    console.error("Error deleting withdraw:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateWithdraw = async (req, res) => {
  try {
    const { id } = req.params;
    const { Amount, Reason, date } = req.body;
    if (!Amount || !Reason || !date) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const updatedWithdraw = await withdrawModel.findByIdAndUpdate(
      id,
      { Amount, Reason, date: new Date(date) },
      { new: true }
    );
    if (!updatedWithdraw) {
      return res
        .status(404)
        .json({ success: false, message: "Withdraw not found" });
    }
    res.json({
      success: true,
      message: "Withdraw updated successfully",
      withdraw: updatedWithdraw,
    });
  } catch (error) {
    console.error("Error updating withdraw:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// In withdrawController.js
exports.getWithdrawById = async (req, res) => {
  try {
    const { id } = req.params;
    const withdraw = await withdrawModel.findById(id);
    if (!withdraw) {
      return res
        .status(404)
        .json({ success: false, message: "Withdraw not found" });
    }
    res.json({ success: true, withdraw });
  } catch (error) {
    console.error("Error fetching withdraw by id:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
