import { Box, Stack, TextField, Toolbar } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import MovieGrid from "../components/common/MovieGrid";
import { useEffect, useState } from "react";
import movieApi from "../api/modules/movie.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

const MoviesPage = () => {
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await movieApi.getAllMovies();
      dispatch(setGlobalLoading(false));

      if (response) {
        setMovies(response);
        setFilteredMovies(response);
      }
      if (error) toast.error(error.message);
    };

    getMovies();
  }, [dispatch]);

  const onMovieSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchValue)
    );
    setFilteredMovies(filteredMovies);
  };

  return (
    <div>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack direction="column" spacing={3} marginTop={2}>
          <TextField
            color="warning"
            placeholder="NoxViews Searching"
            autoFocus
            sx={{ width: "100%" }}
            onChange={onMovieSearch}
          />
          <MovieGrid movies={filteredMovies} />
        </Stack>
      </Box>
    </div>
  );
};

export default MoviesPage;
