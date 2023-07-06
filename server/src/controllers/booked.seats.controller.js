import responseHandler from "../handlers/response.handler.js";
import bookedSeatsModel from "../models/booked.seats.model.js";

const getBookedTickets = async (req, res) => {
  try {
    const { title } = req.params;
    const { showtimeDate, showtimeTime } = req.query;

    const decodedTitle = decodeURIComponent(title);

    const bookedSeats = await bookedSeatsModel.find({
      movieTitle: decodedTitle,
      showtimeDate,
      showtimeTime,
    });

    if (bookedSeats) {
      responseHandler.ok(res, bookedSeats);
    } else {
      responseHandler.notFound(res);
    }
  } catch (error) {
    responseHandler.error(res);
  }
};

const addBookedSeats = async (req, res) => {
  try {
    const { showtimeDate, showtimeTime, seatNumbers, movieId, movieTitle } =
      req.body;

    let bookedSeats = await bookedSeatsModel.findOne({
      showtimeDate,
      showtimeTime,
      movieId,
      movieTitle,
    });

    if (bookedSeats) {
      bookedSeats.seatNumbers.push(...seatNumbers);
    } else {
      bookedSeats = new bookedSeatsModel({
        showtimeDate,
        showtimeTime,
        seatNumbers,
        movieId,
        movieTitle,
      });
    }

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
  getBookedTickets,
  addBookedSeats,
  removeBookedSeats,
};
