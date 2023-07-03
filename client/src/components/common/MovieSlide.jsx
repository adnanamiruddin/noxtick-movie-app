import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import movieApi from "../../api/modules/movie.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MovieItem from "./MovieItem";

const MovieSlide = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const { response, error } = await movieApi.getAllMovies();
      if (response) setMovies(response);
      if (error) toast.error(error.message);
    };

    getMovies();
  }, []);

  return (
    <AutoSwiper>
      {movies.map((movie, i) => (
        <SwiperSlide key={i}>
          <MovieItem movie={movie} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MovieSlide;
