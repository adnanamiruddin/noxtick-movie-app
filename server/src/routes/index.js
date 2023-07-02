import express from "express";
import userRoute from "./user.route.js";
import balanceRoute from "./user.balance.route.js";
import ticketRoute from "./user.ticket.route.js";
import movieRoute from "./movie.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/user/balance", balanceRoute);
router.use("/user", ticketRoute);
router.use("/movie", movieRoute)

export default router;
