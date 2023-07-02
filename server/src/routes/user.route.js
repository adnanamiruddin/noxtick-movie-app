import express from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import userController from "../controllers/user.controller.js";
import balanceController from "../controllers/balance.controller.js";
import userModel from "../models/user.model.js";

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .exists()
    .withMessage("Username is required!")
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters long!")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("Username already exists!");
    }),
  body("displayName")
    .exists()
    .withMessage("Display name is required!")
    .isLength({ min: 8 })
    .withMessage("Display name must be at least 8 characters long!"),
  body("age")
    .exists()
    .withMessage("Age is required!")
    .isInt()
    .withMessage("Age must be a valid number!"),
  body("password")
    .exists()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long!"),
  body("confirmPassword")
    .exists()
    .withMessage("Confirm password is required!")
    .isLength({ min: 8 })
    .withMessage("Confirm password must be at least 8 characters long!")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Confirm password does not match!");
      return true;
    }),
  requestHandler.validate,
  userController.signUp
);

router.post(
  "/signin",
  body("username")
    .exists()
    .withMessage("Username is required!")
    .isLength({ min: 8 })
    .withMessage("Minimum 8 characters for username"),
  body("password")
    .exists()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Minimum 8 characters for password"),
  requestHandler.validate,
  userController.signIn
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.get("/balance", tokenMiddleware.auth, balanceController.getBalance);

router.post(
  "/balance",
)

export default router;
