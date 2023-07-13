import { Box, Typography, Divider, Button } from "@mui/material";
import CancelTicketModal from "./CancelTicketModal";
import { useState } from "react";
import uiConfigs from "../../configs/ui.configs";
// import QRCode from "react-qr-code";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const TicketItem = ({ ticket }) => {
  const {
    bookingTime,
    seatNumbers,
    movieTitle,
    showtimeDate,
    showtimeTime,
    moviePoster,
  } = ticket;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => setIsModalOpen(false);

  const currentTime = new Date();
  const [showtimeDay, showtimeMonth] = showtimeDate.split(" ");
  const [showtimeHours, showtimeMinutes] = showtimeTime.split(".");

  const showtime = new Date();
  showtime.setDate(showtimeDay);
  showtime.setMonth(monthNames.indexOf(showtimeMonth));
  showtime.setHours(showtimeHours);
  showtime.setMinutes(showtimeMinutes);

  const timeDifference =
    (showtime.getTime() - currentTime.getTime()) / (1000 * 60);

  const isExpired = timeDifference < 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 2,
        margin: 2,
        backgroundColor: isExpired ? "gray" : "secondary.main",
        borderRadius: "8px",
        color: "primary.contrastText",
        width: 450,
      }}
    >
      <Box sx={{ ...uiConfigs.style.typoLines(8, "start") }}>
        <Typography
          variant="h5"
          fontWeight="600"
          textAlign="center"
          sx={{
            maxWidth: 200,
            ...uiConfigs.style.typoLines(3, "center"),
          }}
        >
          {movieTitle}
        </Typography>
        <Divider sx={{ margin: "10px 0" }} />

        <Typography variant="body1">Booking Time: {bookingTime}</Typography>

        <Typography variant="body1">
          Showtime: {showtimeDate} 2023 ({showtimeTime})
        </Typography>

        <Typography variant="body1">
          Seat Numbers: {seatNumbers.join(", ")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "end",
        }}
      >
        <Box>
          <img
            src={moviePoster}
            alt={movieTitle}
            style={{ width: "100%", height: "150px" }}
          />
        </Box>
        <Button
          variant="contained"
          color="error"
          disabled={isExpired}
          onClick={() => setIsModalOpen(true)}
        >
          <Typography variant="body1" fontWeight="600">
            Cancel
          </Typography>
        </Button>
      </Box>
      <CancelTicketModal
        open={isModalOpen}
        onClose={handleClose}
        ticket={ticket}
      />
    </Box>
  );
};

export default TicketItem;
