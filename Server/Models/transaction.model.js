import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount must be greater than 0"],
  },
  type: {
    type: String,
    enum: ["deposit", "withdrawal"]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  donatorName: {
    type: String,
    required: function () {
      return this.type === "deposit";
    },
    minlength: [3, "Donator name must be at least 3 characters long"],
  },
  reason: {
    type: String,
    required: function () {
      return this.type === "withdrawal";
    },
    minlength: [3, "Reason must be at least 3 characters long"],
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction; 