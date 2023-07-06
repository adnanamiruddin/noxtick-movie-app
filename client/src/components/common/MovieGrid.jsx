import { Grid } from "@mui/material";
import MovieItem from "./MovieItem";

const MovieGrid = ({ movies }) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: "-8px !important" }}>
      {movies.map((movie, i) => (
        <Grid key={i} item xs={6} sm={4} md={3}>
          <MovieItem movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
