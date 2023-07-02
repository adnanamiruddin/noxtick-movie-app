import responseHandler from "../handlers/response.handler.js";
import balanceModel from "../models/balance.model.js";

const getBalance = async (req, res) => {
  try {
    const { id } = req.user;

    const balance = await balanceModel.findOne({ userId: id });

    if (!balance) {
      return responseHandler.notFound(res, "Balance not found");
    }

    responseHandler.ok(res, balance);
  } catch (error) {
    responseHandler.error(res);
  }
};

const updateBalance = async (req, res) => {
  try {
    const { id } = req.user;
    const { amount } = req.body;

    const balance = await balanceModel.findOne({ userId: id });

    if (!balance) {
      return responseHandler.notFound(res, "Balance not found");
    }

    balance.amount = amount;

    await balance.save();

    responseHandler.ok(res, balance);
  } catch (error) {
    responseHandler.error(res);
  }
};

const withdrawBalance = async (req, res) => {
  try {
    const { id } = req.user;
    const { amount, password } = req.body;

    const balance = await balanceModel.findOne({ userId: id });

    if (!balance) {
      return responseHandler.notFound(res, "Balance not found");
    }

    if (balance.amount < amount) {
      return responseHandler.badRequest(res, "Balance is not enough");
    }

    const user = balance.user;
    if (!user.validatePassword(password)) {
      return responseHandler.badRequest(res, "Wrong password!");
    }

    balance.amount = balance.amount - amount;

    await balance.save();

    responseHandler.ok(res, balance);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default { getBalance, updateBalance, withdrawBalance };
