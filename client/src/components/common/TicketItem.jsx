import { Box, Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";

const TicketItem = ({ ticket }) => {
  const {
    bookingTime,
    seatNumbers,
    movieTitle,
    showtimeDate,
    showtimeTime,
    bookingData,
  } = ticket;

  // const bookingDateTime = new Date(bookingTime);
  // const formattedBookingTime = format(bookingDateTime, "dd MMMM yyyy, HH:mm");

  // const posterUrl = moviePosters[movieTitle];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
        margin: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ marginRight: 4 }}>
        {/* <img
          src={posterUrl}
          alt={movieTitle}
          style={{ width: "100px", height: "150px" }}
        /> */}
      </Box>
      <Box>
        <Typography variant="h6">{movieTitle}</Typography>
        <Typography variant="body1">
          Showtime: {showtimeDate} {showtimeTime}
        </Typography>
        <Typography variant="body1">
          Booking Time: {bookingTime}
        </Typography>
        <Typography variant="body1">
          Seat Numbers: {seatNumbers.join(", ")}
        </Typography>
        {/* <Typography variant="body1">Booking Data: {bookingData}</Typography> */}
      </Box>
    </Box>
  );
};

export default TicketItem;
