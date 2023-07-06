import { Box, Typography, Divider, Button } from "@mui/material";
import CancelTicketModal from "./CancelTicketModal";
import { useState } from "react";
import userTicketApi from "../../api/modules/user.ticket.api";
import uiConfigs from "../../configs/ui.configs";
import { toast } from "react-toastify";

const TicketItem = ({ ticket }) => {
  const {
    id,
    bookingTime,
    seatNumbers,
    movieTitle,
    showtimeDate,
    showtimeTime,
    moviePoster,
  } = ticket;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => setIsModalOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 2,
        margin: 2,
        backgroundColor: "secondary.main",
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
        ticketId={id}
      />
    </Box>
  );
};

export default TicketItem;
