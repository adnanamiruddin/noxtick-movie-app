import { useLocation, useParams } from "react-router-dom";
import movieApi from "../api/modules/movie.api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import HeaderImage from "../components/common/HeaderImage";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import BuyTicketModal from "../components/common/BuyTicketModal";
import MovieSeats from "../components/common/MovieSeats";
import MovieSchedule from "../components/common/MovieSchedule";
import Container from "../components/common/Container";
import bookedSeatsApi from "../api/modules/booked.seats.api";
import dayjs from "dayjs";

const MovieDetail = () => {
  const { user } = useSelector((state) => state.user);
  const { movieTitle } = useParams();
  const location = useLocation();

  const dispatch = useDispatch();

  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("DD MMM"));
  const [selectedTime, setSelectedTime] = useState("11.40");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [showSeats, setShowSeats] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMovieDetails = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await movieApi.getMovieByTitle({
        title: movieTitle,
      });
      dispatch(setGlobalLoading(false));
      if (response) {
        setMovie(response);
      }
      if (error) toast.error(error.message);
    };

    getMovieDetails();
  }, [movieTitle, dispatch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const dateParam = searchParams.get("date");
    const timeParam = searchParams.get("time");

    setSelectedDate(dateParam || dayjs().format("DD MMM"));
    setSelectedTime(timeParam || "11.40");

    const getBookedSeats = async () => {
      const { response, error } = await bookedSeatsApi.getBookedSeatsByTitle({
        title: movieTitle,
        showtimeDate: selectedDate || dateParam,
        showtimeTime: selectedTime || timeParam,
      });
      if (response && response.length > 0) {
        setBookedSeats(
          response[0].seatNumbers.length > 0 ? response[0].seatNumbers : []
        );
      } else {
        setBookedSeats([]);
        if (error) toast.error(error.message);
      }
    };

    getBookedSeats();
  }, [location.search, movieTitle, bookedSeats]);

  const handleClose = () => setIsModalConfirmOpen(false);

  return movie ? (
    <div>
      {/* Movie's Background Image START */}
      <HeaderImage imgPath={movie.poster_url} />
      {/* Movie's Background Image END */}

      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Movie's Poster START */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "30%" },
                margin: { xs: "0 auto 2rem", md: "0 4rem 0 2rem" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "160%",
                  ...uiConfigs.style.backgroundImage(movie.poster_url),
                }}
              />
            </Box>
            {/* Movie's Poster END */}

            {/* Movie's Information START */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
                marginTop: { xs: 0, md: "10%" },
              }}
            >
              <Stack spacing={5}>
                {/* Movie's Title START */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", lg: "3.5rem" }}
                  fontWeight="700"
                  textTransform="uppercase"
                  sx={{
                    ...uiConfigs.style.typoLines(2, {
                      xs: "center",
                      md: "left",
                    }),
                  }}
                >{`${movie.title} (${
                  movie.release_date.split("-")[0]
                })`}</Typography>
                {/* Movie's Title END */}

                {/* Movie's Overview/Description START  */}
                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {movie.description}
                </Typography>
                {/* Movie's Overview/Description END  */}

                {/* Movie's Age Rating START */}
                <Box
                  sx={{
                    backgroundColor:
                      movie.age_rating <= 11
                        ? "success.main"
                        : movie.age_rating > 11 && movie.age_rating <= 13
                        ? "info.main"
                        : "error.main",
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    width: "max-content",
                    "&:hover": {
                      cursor: "pointer",
                      "&::after": {
                        content: "'Age Rating'",
                        display: "block",
                        position: "absolute",
                        transform: "translateX(-50%)",
                        backgroundColor: "#fff",
                        color: "#000",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.25rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
                      },
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="700"
                    sx={{ fontSize: "1.5rem", ...uiConfigs.style.typoLines(1) }}
                  >
                    {movie.age_rating}+
                  </Typography>
                </Box>
                {/* Movie's Age Rating END */}
              </Stack>
            </Box>
            {/* Movie's Information END */}
          </Box>
        </Box>

        <Box sx={{ marginTop: "4rem" }}>
          <Container header="Movie Schedule">
            <MovieSchedule
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              setShowSeats={setShowSeats}
            />
          </Container>
          <Container header="Movie Seats">
            {!showSeats ? (
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ textAlign: "center" }}
              >
                Please select a date and time to see available seats
              </Typography>
            ) : (
              ""
            )}
            <MovieSeats
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bookedSeats={bookedSeats}
              showSeats={showSeats}
            />
          </Container>
          <Box
            sx={{
              marginTop: "2rem",
              display: user ? "flex" : "none",
              justifyContent: "end",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => setIsModalConfirmOpen(true)}
            >
              Buy Tickets
            </Button>
          </Box>
          <BuyTicketModal
            open={isModalConfirmOpen}
            onClose={handleClose}
            movie={movie}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedSeats={selectedSeats}
          />
        </Box>
      </Box>
    </div>
  ) : null;
};

export default MovieDetail;
