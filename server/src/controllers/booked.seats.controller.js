import responseHandler from "../handlers/response.handler.js";
import bookedSeatsModel from "../models/booked.seats.model.js";

const getAllBookedSeats = async (req, res) => {
  try {
    const bookedSeats = await bookedSeatsModel.find();
    responseHandler.ok(res, bookedSeats);
  } catch (error) {
    responseHandler.error(res);
  }
};

const addBookedSeats = async (req, res) => {
  try {
    const { showtimeDate, showtimeTime, seatNumbers, movieId, movieTitle } =
      req.body;

    const bookedSeats = new bookedSeatsModel();

    bookedSeats.showtimeDate = showtimeDate;
    bookedSeats.showtimeTime = showtimeTime;
    bookedSeats.seatNumbers = seatNumbers;
    bookedSeats.movieId = movieId;
    bookedSeats.movieTitle = movieTitle;

    await bookedSeats.save();

    responseHandler.created(res, bookedSeats);
  } catch (error) {
    responseHandler.error(res);
  }
};

const removeBookedSeats = async (req, res) => {
  try {
    const { id } = req.params;

    await bookedSeatsModel.findByIdAndDelete(id);

    responseHandler.ok(res);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default {
  getAllBookedSeats,
  addBookedSeats,
  removeBookedSeats,
};
