import { Box, Toolbar } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import MovieGrid from "../components/common/MovieGrid";
import { useEffect, useState } from "react";
import movieApi from "../api/modules/movie.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import Container from "../components/common/Container";

const MoviesPage = () => {
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await movieApi.getAllMovies();
      dispatch(setGlobalLoading(false));

      if (response) setMovies(response);
      if (error) toast.error(error.message);
    };

    getMovies();
  }, [dispatch]);

  return (
    <div>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <MovieGrid movies={movies} />
      </Box>
    </div>
  );
};

export default MoviesPage;
