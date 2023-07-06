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

const getMovieByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const decodedTitle = decodeURIComponent(title);

    const movies = await axiosClient.get(baseUrl);
    const movie = movies.find((m) => m.title === decodedTitle);

    if (movie) {
      responseHandler.ok(res, movie);
    } else {
      responseHandler.error(res, "Movie not found");
    }
  } catch (error) {
    responseHandler.error(res);
  }
};

export default { getAllMovies, getMovieByTitle };
