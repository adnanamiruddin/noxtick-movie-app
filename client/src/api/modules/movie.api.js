import publicClient from "../client/public.client";

const movieEndPoints = {
  movie: "movie",
  movieByTitle: ({ title }) => `movie/${title}`,
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

  getMovieByTitle: async ({ title }) => {
    try {
      const response = await publicClient.get(movieEndPoints.movieByTitle({ title }));
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default movieApi;
