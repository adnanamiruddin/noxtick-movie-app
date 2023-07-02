import express from "express";
import userRoute from "./user.route.js";
import ticketRoute from "./user.ticket.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/user", ticketRoute);

export default router;
