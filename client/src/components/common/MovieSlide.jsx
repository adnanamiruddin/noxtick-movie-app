import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import movieApi from "../../api/modules/movie.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MovieItem from "./MovieItem";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";

const MovieSlide = () => {
  const dispatch = useDispatch()

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      dispatch(setGlobalLoading(true))
      const { response, error } = await movieApi.getAllMovies();
      dispatch(setGlobalLoading(false))
      if (response) setMovies(response);
      if (error) toast.error(error.message);
    };

    getMovies();
  }, [dispatch]);

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
