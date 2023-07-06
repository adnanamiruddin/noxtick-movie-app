import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    bookingTime: {
      type: String,
      required: true,
      default: new Date().toLocaleDateString(),
    },
    seatNumbers: {
      type: [Number],
      required: true,
    },
    showtimeDate: {
      type: String,
      required: true,
    },
    showtimeTime: {
      type: String,
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
  },
  modelOptions
);

const ticketModel = mongoose.model("Ticket", ticketSchema);

export default ticketModel;
