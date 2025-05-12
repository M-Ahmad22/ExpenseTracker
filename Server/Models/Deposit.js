const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema({
  DepositAmount: {
    type: Number,
    required: true,
  },
  DonatorName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const DepositModel = mongoose.model("deposit", depositSchema);
module.exports = DepositModel;
