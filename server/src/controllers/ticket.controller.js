import responseHandler from "../handlers/response.handler.js";
import ticketModel from "../models/ticket.model.js";
import balanceModel from "../models/balance.model.js";
import transactionModel from "../models/transaction.model.js";

const bookTickets = async (req, res) => {
  try {
    const { user } = req;
    const { seatNumbers, movieAgeRating, movieTicketPrice, showtimeTime } =
      req.body;

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

    const bookedSeats = await ticketModel.find({
      showtimeDate: { $gte: new Date() },
      showtimeTime,
      seatNumbers: { $in: seatNumbers },
    });

    if (bookedSeats.length > 0) {
      return responseHandler.badRequest(
        res,
        "Some seats have already been booked"
      );
    }

    const totalPrice = movieTicketPrice * seatNumbers.length;

    const balance = await balanceModel.findOne({ user: user.id });

    if (!balance || balance.balanceAmount < totalPrice) {
      return responseHandler.badRequest(
        res,
        "Balance is not enough. Please top up your balance."
      );
    }

    const ticket = new ticketModel({
      user: user.id,
      ...req.body,
    });

    balance.balanceAmount -= totalPrice;
    await balance.save();

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

    const transactions = await ticketModel.find({ user: user.id });

    responseHandler.ok(res, transactions);
  } catch (error) {
    responseHandler.error(res);
  }
};

const cancelTicket = async (req, res) => {
  try {
    const { user } = req;
    const { ticketId } = req.params;

    const ticket = await ticketModel.findOne({ _id: ticketId, user: user.id });

    if (!ticket) {
      return responseHandler.notFound(res, "Ticket not found");
    }

    const balance = await balanceModel.findOne({ user: user.id });

    balance.balanceAmount +=
      ticket.movieTicketPrice * ticket.seatNumbers.length;
    await balance.save();

    await ticketModel.deleteOne({ _id: ticketId, user: user.id });

    const transaction = new transactionModel({
      user: user.id,
      ticket: ticket._id,
      quantity: seatNumbers.length,
      totalPrice,
      transactionDate: new Date(),
      transactionStatus: "Cancelled",
    });

    await transaction.save();

    responseHandler.ok(res, "Successfully canceled ticket");
  } catch (error) {
    responseHandler.error(res);
  }
};

export default { bookTickets, getTicketsTransaction, cancelTicket };
