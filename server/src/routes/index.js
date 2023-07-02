import express from "express";
import userRoute from "./user.route.js";
import balanceRoute from "./user.balance.route.js";
import ticketRoute from "./user.ticket.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/user", balanceRoute);
router.use("/user", ticketRoute);

export default router;
