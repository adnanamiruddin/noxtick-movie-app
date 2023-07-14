import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    transactionStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Paid", "Cancelled"],
      default: "Pending",
    },
  },
  modelOptions
);

const transactionModel = mongoose.model("Transaction", transactionSchema);

export default transactionModel;
