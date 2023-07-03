import { SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import AutoSwiper from "./AutoSwiper";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import movieApi from "../../api/modules/movie.api";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";

const MoviePostersSlide = () => {
  const dispatch = useDispatch()

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      dispatch(setGlobalLoading(true))
      const { response, error } = await movieApi.getAllMovies();
      dispatch(setGlobalLoading(false))

      if (response) setMovies(response);
      if (error) console.log(error.message);
    };

    getMovies();
  }, [dispatch])

  return (
    <AutoSwiper>
      {movies.map((movie, i) => (
        <SwiperSlide key={i}>
          <Box sx={{
            paddingTop: "160%",
            backgroundImage: `url(${movie.poster_url})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            marginRight: 0.5,
          }} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MoviePostersSlide;
