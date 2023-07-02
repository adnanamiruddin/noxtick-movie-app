import responseHandler from "../handlers/response.handler";
import axiosClient from "../axios/axios.client.js";

const baseUrl = process.env.DB_MOVIES;

const getAllMovies = async (req, res) => {
  try {
    const response = await axiosClient.get(baseUrl);
    responseHandler.ok(res, response);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default { getAllMovies };
