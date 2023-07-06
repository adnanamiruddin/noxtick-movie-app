import responseHandler from "../handlers/response.handler.js";
import ticketModel from "../models/ticket.model.js";
import userModel from "../models/user.model.js";
import transactionModel from "../models/transaction.model.js";
import bookedSeatsModel from "../models/booked.seats.model.js";

const bookTickets = async (req, res) => {
  try {
    const { id } = req.user;
    const {
      showtimeDate,
      showtimeTime,
      seatNumbers,
      movieAgeRating,
      movieTicketPrice,
      movieTitle,
      moviePoster,
    } = req.body;

    const user = await userModel.findById(id);

    if (user.age < movieAgeRating) {
      return responseHandler.badRequest(
        res,
        "You are not old enough to watch this movie"
      );
    }

    if (seatNumbers.length > 6) {
      return responseHandler.badRequest(
        res,
        "You can only book up to 6 seats per transaction"
      );
    }

    const isValidSeatNumbers =
      Array.isArray(seatNumbers) &&
      seatNumbers.length > 0 &&
      seatNumbers.every(
        (seatNumber) =>
          Number.isInteger(seatNumber) && seatNumber >= 1 && seatNumber <= 64
      ) &&
      new Set(seatNumbers).size === seatNumbers.length;

    if (!isValidSeatNumbers) {
      return responseHandler.badRequest(
        res,
        "Invalid seat numbers. Please select valid seat numbers."
      );
    }

    const bookedSeats = await bookedSeatsModel.find({
      showtimeDate,
      showtimeTime,
      seatNumbers: { $in: seatNumbers },
      movieTitle,
    });

    if (bookedSeats.length > 0) {
      return responseHandler.badRequest(
        res,
        "Some seats have already been booked"
      );
    }

    const totalPrice = movieTicketPrice * seatNumbers.length;

    if (user.balance < totalPrice) {
      return responseHandler.badRequest(
        res,
        "Balance is not enough. Please top up your balance."
      );
    }

    const ticket = new ticketModel({
      user: user.id,
      ...req.body,
    });

    user.balance -= totalPrice;
    await user.save();

    await ticket.save();

    const transaction = new transactionModel({
      user: user.id,
      ticket: ticket._id,
      quantity: seatNumbers.length,
      totalPrice,
      transactionDate: new Date(),
      transactionStatus: "Paid",
    });

    await transaction.save();

    responseHandler.ok(res, ticket);
  } catch (error) {
    responseHandler.error(res);
  }
};

const getTicketsTransaction = async (req, res) => {
  try {
    const { user } = req;

    const transactions = await ticketModel
      .find({ user: user.id })
      .sort("-createdAt");

    responseHandler.ok(res, transactions);
  } catch (error) {
    responseHandler.error(res);
  }
};

const cancelTicket = async (req, res) => {
  try {
    const { id } = req.user;
    const { ticketId, password } = req.body;

    const user = await userModel
      .findById(id)
      .select("id password salt balance");
    const ticket = await ticketModel.findOne({ _id: ticketId, user: user.id });

    if (!user) {
      return responseHandler.notFound(res, "User not found");
    }

    if (!user.validatePassword(password)) {
      return responseHandler.badRequest(res, "Wrong password!");
    }

    if (!ticket) {
      return responseHandler.notFound(res, "Ticket not found");
    }

    user.balance += ticket.movieTicketPrice * ticket.seatNumbers.length;

    await user.save();

    await ticketModel.deleteOne({ _id: ticketId, user: user.id });

    const transaction = await transactionModel.updateOne(
      { user: user.id, ticket: ticketId },
      {
        transactionStatus: "Cancelled",
      }
    );

    await transaction.save();

    responseHandler.ok(res, "Successfully canceled ticket");
  } catch (error) {
    responseHandler.error(res);
  }
};

export default { bookTickets, getTicketsTransaction, cancelTicket };
