import express from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import ticketController from "../controllers/ticket.controller.js";

const router = express.Router();

router.get(
  "/my-tickets",
  tokenMiddleware.auth,
  ticketController.getTicketsTransaction
);

router.post(
  "/book-tickets",
  tokenMiddleware.auth,
  body("showtimeDate")
    .exists()
    .withMessage("Showtime date is required!")
    .isString()
    .withMessage("Showtime date must be a valid string!"),
  body("showtimeTime")
    .exists()
    .withMessage("Showtime time is required!")
    .isString()
    .withMessage("Showtime time must be a valid date!"),
  body("seatNumbers")
    .exists()
    .withMessage("Seat numbers are required!")
    .isArray({ min: 1, max: 6 })
    .withMessage("Seat numbers must be an array of 1 to 6 elements!"),
  body("movieAgeRating")
    .exists()
    .withMessage("Movie age rating is required!")
    .isInt({ min: 0 })
    .withMessage("Movie age rating must be a valid number!"),
  body("movieTicketPrice")
    .exists()
    .withMessage("Movie ticket price is required!")
    .isInt({ min: 0 })
    .withMessage("Movie ticket price must be a valid number!"),
  body("movieTitle")
    .exists()
    .withMessage("Movie title is required!")
    .isString()
    .withMessage("Movie title must be a valid string!"),
  requestHandler.validate,
  ticketController.bookTickets
);

router.post(
  "/cancel-tickets/:ticketId",
  tokenMiddleware.auth,
  ticketController.cancelTicket
);

export default router;
