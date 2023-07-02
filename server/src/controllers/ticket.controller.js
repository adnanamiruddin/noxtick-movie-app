import responseHandler from "../handlers/response.handler.js";
import ticketModel from "../models/ticket.model.js";
import balanceModel from "../models/balance.model.js";

const bookTicket = async (req, res) => {
  try {
    const { user } = req;
    const { seatNumbers, movieAgeRating, movieTicketPrice } = req.body;

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

    const bookedSeats = await ticketModel.find({
      showtimeDate: { $gte: new Date() },
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

    responseHandler.ok(res, ticket);
  } catch (error) {
    responseHandler.error(res);
  }
};

// const bookTicket = async (req, res) => {
//   try {
//     const { id } = req.user;
//     const { seat } = req.body;

//     const ticket = await ticketModel.findOne({ seat });

//     if (ticket) {
//       return responseHandler.badRequest(res, "Seat is already booked");
//     }

//     const newTicket = new ticketModel({
//       seat,
//       userId: id,
//     });

//     await newTicket.save();

//     responseHandler.ok(res, newTicket);
//   } catch (error) {
//     responseHandler.error(res);
//   }
// };
