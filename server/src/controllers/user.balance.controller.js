import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

const getBalance = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await userModel.findById(id).select("balance");

    if (!user) {
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

    const user = await userModel.findById(id).select("balance");

    if (!user) {
      return responseHandler.notFound(res, "Balance not found");
    }

    user.balance += amount;

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

    const user = await userModel.findById(id).select("balance");

    if (!user) {
      return responseHandler.notFound(res, "Balance not found");
    }

    if (user.balance < amount) {
      return responseHandler.badRequest(res, "Balance is not enough");
    }

    if (!user.validatePassword(password)) {
      return responseHandler.badRequest(res, "Wrong password!");
    }

    user.balance -= amount;

    await balance.save();

    responseHandler.ok(res, balance);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default { getBalance, updateBalance, withdrawBalance };
