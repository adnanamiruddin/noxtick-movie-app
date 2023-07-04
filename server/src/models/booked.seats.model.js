import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const bookedSeatsSchema = new mongoose.Schema(
  {
    showtimeDate: {
      type: Date,
      required: true,
    },
    showtimeTime: {
      type: String,
      required: true,
    },
    seatNumbers: {
      type: [Number],
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
  },
  modelOptions
);

const bookedSeatsModel = mongoose.model("BookedSeats", bookedSeatsSchema);

export default bookedSeatsModel;
