const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
  Amount: {
    type: Number,
    required: true,
  },
  Reason: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const WithdrawModel = mongoose.model("withdraw", withdrawSchema);
module.exports = WithdrawModel;
