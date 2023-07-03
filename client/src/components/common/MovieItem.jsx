import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import { Button, Stack, Typography } from "@mui/material";

const MediaItem = ({ movie }) => {
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [posterUrl, setPosterUrl] = useState("");
  const [ageRating, setAgeRating] = useState(null);

  useEffect(() => {
    setTitle(movie.title);
    setReleaseDate(movie.release_date);
    setPosterUrl(movie.poster_url);
    setAgeRating(movie.age_rating);
  }, [movie]);

  return (
    <Link to={routesGen.movieDetail(movie.id)}>
      <Box
        sx={{
          marginRight: 0.5,
          paddingTop: "160%",
          color: "primary.contrastText",
          ...uiConfigs.style.backgroundImage(posterUrl),
          "&:hover .media-info": { bottom: 0, opacity: 1 },
          "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
        }}
      >
        {/* Hover Styling Movie item START */}
        {mediaType !== "people" ? (
          <div>
            <Box
              className="media-back-drop"
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundImage:
                  "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
                opacity: { xs: 1, md: 0 },
                transition: "all 0.3s ease",
              }}
            />
            <Button
              className="media-play-btn"
              variant="contained"
              startIcon={<PlayArrowIcon />}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                display: { xs: "none", md: "flex" },
                opacity: 0,
                transition: "all 0.4s ease",
                transform: "translate(-50%, -50%)",
                "& .MuiButton-startIcon": { marginRight: "-4px" },
              }}
              color="error"
            />
            <Box
              className="media-info"
              sx={{
                width: "100%",
                height: "max-content",
                position: "absolute",
                bottom: { xs: 0, md: "-20px" },
                padding: { xs: "10px", md: "1.5rem 1rem" },
                boxSizing: "border-box",
                opacity: { xs: 1, md: 0 },
                transition: "all 0.6s ease",
              }}
            >
              <Stack spacing={{ xs: 1, md: 2 }}>
                <Typography>{releaseDate}</Typography>
                <Typography
                  variant="body1"
                  fontWeight="700"
                  sx={{
                    fontSize: "1rem",
                    ...uiConfigs.style.typoLines(1, "left"),
                  }}
                >
                  {title}
                </Typography>
              </Stack>
            </Box>
          </div>
        ) : (
          ""
        )}
        {/* Hover Styling Movie item END */}
      </Box>
    </Link>
  );
};

export default MediaItem;
