import { Grid } from "@mui/material";
import MovieItem from "./MovieItem";

const MovieGrid = ({ medias }) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: "-8px !important" }}>
      {medias.map((media, i) => (
        <Grid key={i} item xs={6} sm={4} md={3}>
          <MovieItem media={media} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
