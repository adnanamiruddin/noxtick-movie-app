import express from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import ticketController from "../controllers/ticket.controller.js";

const router = express.Router();

router.get("/", tokenMiddleware.auth, ticketController.getTicketsTransaction);

router.post(
  "/",
  tokenMiddleware.auth,
  body("showtimeDate")
    .exists()
    .withMessage("Showtime date is required!")
    .isString()
    .withMessage("Showtime date must be a valid date!"),
  body("showtimeTime")
    .exists()
    .withMessage("Showtime time is required!")
    .isString()
    .withMessage("Showtime time must be a valid hour!"),
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
  body("moviePoster")
    .exists()
    .withMessage("Movie poster is required!")
    .isString()
    .withMessage("Movie poster must be a valid string!"),
  body("movieTicketPrice")
    .exists()
    .withMessage("Movie ticket price is required!")
    .isInt({ min: 0 })
    .withMessage("Movie ticket price must be a valid number!"),
  requestHandler.validate,
  ticketController.bookTickets
);

router.delete(
  "/",
  tokenMiddleware.auth,
  body("ticketId")
    .exists()
    .withMessage("Ticket ID is required!")
    .isMongoId()
    .withMessage("Ticket ID must be a valid MongoDB ID!"),
  body("password")
    .exists()
    .withMessage("Password is required!")
    .isString()
    .withMessage("Password must be a valid string!"),
  requestHandler.validate,
  ticketController.cancelTicket
);

export default router;
