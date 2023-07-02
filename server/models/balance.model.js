import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const balanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balanceAmount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  modelOptions
);

const Balance = mongoose.model("Balance", balanceSchema);

export default Balance;
