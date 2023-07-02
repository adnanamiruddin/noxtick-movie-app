import publicClient from "../client/public.client";

const movieEndPoints = {
  movie: "movie",
  movieById: ({ id }) => `movie/${id}`,
};

const movieApi = {
  getAllMovies: async () => {
    try {
      const response = await publicClient.get(movieEndPoints.movie);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getMovieById: async ({ id }) => {
    try {
      const response = await publicClient.get(movieEndPoints.movieById({ id }));
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default movieApi;
