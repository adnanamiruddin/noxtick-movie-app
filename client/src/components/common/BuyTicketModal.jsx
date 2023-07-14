import { useDispatch, useSelector } from "react-redux";
import { Modal, Box, Typography, Button } from "@mui/material";
import Logo from "./Logo";
import userTicketApi from "../../api/modules/user.ticket.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import bookedSeatsApi from "../../api/modules/booked.seats.api";
import { bookTickets } from "../../redux/features/userSlice";
import uiConfigs from "../../configs/ui.configs";
import DateRangeIcon from "@mui/icons-material/DateRange";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import { useState } from "react";

const BuyTicketModal = ({
  open,
  onClose,
  movie,
  selectedDate,
  selectedTime,
  selectedSeats,
}) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [onRequest, setOnRequest] = useState(false);

  const currentTime = new Date();
  const total = selectedSeats.length * movie.ticket_price;
  const isEnoughBalance = user.balance >= total;

  const handleConfirmBuy = async () => {
    if (onRequest) return;

    setOnRequest(true);
    const body = {
      showtimeDate: selectedDate,
      showtimeTime: selectedTime,
      seatNumbers: selectedSeats,
      movieAgeRating: movie.age_rating,
      movieTicketPrice: movie.ticket_price,
      movieTitle: movie.title,
      moviePoster: movie.poster_url,
    };
    const { response, error } = await userTicketApi.bookTickets(body);

    if (response) {
      const body = {
        showtimeDate: selectedDate,
        showtimeTime: selectedTime,
        seatNumbers: selectedSeats,
        movieId: movie.id,
        movieTitle: movie.title,
      };
      const { response, error } = await bookedSeatsApi.addBookedSeats(body);

      if (response) {
        dispatch(bookTickets(response));
        toast.success("Berhasil membeli tiket");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
      if (error) toast.error(error.message);
    }
    if (error) toast.error(error.message);
    setOnRequest(false);
  };

  return user ? (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "background.paper",
          boxShadow: 24,
          padding: 4,
          paddingTop: 2,
          maxWidth: 600,
          borderRadius: "1rem",
          width: { xs: "75%", sm: "65%", md: "50%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Logo />
        </Box>

        {user.age > movie.age_rating ? (
          <Box>
            <Typography
              variant="h5"
              fontWeight="800"
              sx={{
                marginTop: 1,
                marginBottom: 3,
                ...uiConfigs.style.typoLines(3, "center"),
              }}
            >
              {movie.title} ({movie.age_rating}+)
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "start",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 4, sm: 0 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <DateRangeIcon />
                  {selectedDate + " " + currentTime.getFullYear()}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <WatchLaterOutlinedIcon /> {selectedTime}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    maxWidth: {xs: "100%", sm: "90%", md: "100%"}
                  }}
                >
                  <WeekendOutlinedIcon /> [ {selectedSeats.join(", ")} ]
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: { xs: "start", sm: "end" },
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    flexDirection: { xs: "row", sm: "row-reverse" },
                  }}
                >
                  <AttachMoneyOutlinedIcon /> Balance Rp.{user.balance}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    flexDirection: { xs: "row", sm: "row-reverse" },
                  }}
                >
                  <PointOfSaleOutlinedIcon /> Total Rp.{total}
                </Typography>

                <Box
                  variant="body1"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    flexDirection: { xs: "row", sm: "row-reverse" },
                  }}
                >
                  <CurrencyExchangeOutlinedIcon />{" "}
                  {!isEnoughBalance ? (
                    <Typography
                      variant="body1"
                      fontWeight="700"
                      sx={{
                        color: "red",
                        textAlign: { xs: "start", sm: "end" },
                        maxWidth: "85%",
                      }}
                    >
                      Not enough balance ({user.balance - total})
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      fontWeight="700"
                      sx={{
                        color: "green",
                        textAlign: { xs: "start", sm: "end" },
                      }}
                    >
                      Change Rp.{user.balance - total}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="caption">
                Confirm your purchase, {user.displayName.split(" ")[0]}
              </Typography>
              <Button
                variant="contained"
                disabled={total !== 0 ? false : true}
                onClick={handleConfirmBuy}
                sx={{ width: "50%" }}
              >
                Buy
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography>Sorry, you are not old enough ({user.age}) to watch this film</Typography>
        )}
      </Box>
    </Modal>
  ) : (
    ""
  );
};

export default BuyTicketModal;
