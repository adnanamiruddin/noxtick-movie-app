import responseHandler from "../handlers/response.handler.js";
import axiosClient from "../axios/axios.client.js";

const baseUrl = process.env.DB_MOVIES;

const getAllMovies = async (req, res) => {
  try {
    const movies = await axiosClient.get(baseUrl);

    responseHandler.ok(res, movies);
  } catch (error) {
    responseHandler.error(res);
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    const movies = await axiosClient.get(baseUrl);

    responseHandler.ok(res, movies[id]);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default { getAllMovies, getMovieById };
