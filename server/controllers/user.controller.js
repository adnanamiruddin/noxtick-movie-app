import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

const signUp = async (req, res) => {
  try {
    const { username, displayName, age, password } = req.body;

    const checkUser = await userModel.findOne({ username });

    if (checkUser) {
      return responseHandler.badRequest(res, "User name already exist");
    }

    const user = new userModel();

    user.username = username;
    user.displayName = displayName;
    user.age = age;
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.SECRET_TOKEN,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select("id username displayName age password salt");

    if (!user) return responseHandler.badRequest(res, "User does not exist");

    if (!user.validatePassword(password)) {
      return responseHandler.badRequest(res, "Wrong password!");
    }

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.SECRET_TOKEN,
      { expiresIn: "24h" }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};
