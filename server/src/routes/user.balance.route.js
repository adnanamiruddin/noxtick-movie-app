import express from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import balanceController from "../controllers/balance.controller.js";

const router = express.Router();

router.get("/balance", tokenMiddleware.auth, balanceController.getBalance);

router.post(
  "/topup",
  tokenMiddleware.auth,
  body("amount")
    .exists()
    .withMessage("Amount is required!")
    .isInt()
    .withMessage("Amount must be a valid number!"),
  requestHandler.validate,
  balanceController.updateBalance
);

router.post(
  "/withdraw",
  tokenMiddleware.auth,
  body("amount")
    .exists()
    .withMessage("Amount is required!")
    .isInt()
    .withMessage("Amount must be a valid number!"),
  body("password")
    .exists()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Minimum 8 characters for password"),
  requestHandler.validate,
  balanceController.updateBalance
);

export default router;
