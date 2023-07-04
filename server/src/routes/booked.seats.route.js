import express from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import bookedSeatsController from "../controllers/booked.seats.controller.js";

const router = express.Router();

router.get("/", bookedSeatsController.getAllBookedSeats);

router.post(
  "/",
  tokenMiddleware.auth,
  body("showtimeDate")
    .exists()
    .withMessage("Showtime date is required!")
    .isDate()
    .withMessage("Showtime date must be a valid date!"),
  body("showtimeTime")
    .exists()
    .withMessage("Showtime time is required!")
    .isString()
    .withMessage("Showtime time must be a valid string!"),
  body("seatNumbers")
    .exists()
    .withMessage("Seat numbers is required!")
    .isArray()
    .withMessage("Seat numbers must be a valid array!"),
  body("movieId")
    .exists()
    .withMessage("Movie id is required!")
    .isInt()
    .withMessage("Movie id must be a valid number!"),
  body("movieTitle")
    .exists()
    .withMessage("Movie title is required!")
    .isString()
    .withMessage("Movie title must be a valid string!"),
  requestHandler.validate,
  bookedSeatsController.addBookedSeats
);

router.delete(
  "/:id",
  tokenMiddleware.auth,
  requestHandler.validate,
  bookedSeatsController.removeBookedSeats
);

export default router;
