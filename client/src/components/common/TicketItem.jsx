import { Box, Typography, Divider, Button } from "@mui/material";
import CancelTicketModal from "./CancelTicketModal";
import { useState } from "react";
import uiConfigs from "../../configs/ui.configs";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";

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
        justifyContent: { xs: "space-between", sm: "space-around" },
        alignItems: "start",
        gap: { xs: 1.5, sm: 0 },
        padding: 2,
        margin: 2,
        backgroundColor: isExpired ? "gray" : "secondary.main",
        borderRadius: "8px",
        color: "primary.contrastText",
        maxWidth: 450,
        flexGrow: 1,
        height: { xs: "auto", sm: 250 },
      }}
    >
      <Box sx={{ ...uiConfigs.style.typoLines(8, "start") }}>
        <Typography
          variant="h5"
          fontWeight="800"
          sx={{
            maxWidth: 200,
            ...uiConfigs.style.typoLines(2, "center"),
          }}
        >
          {movieTitle}
        </Typography>
        <Divider sx={{ margin: "10px 0" }} />

        <Box
          textAlign="start"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
            gap: 1.5,
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
            <DateRangeOutlinedIcon />
            {showtimeDate + " " + currentTime.getFullYear()}
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
            <WatchLaterOutlinedIcon /> {showtimeTime}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              marginBottom: 0.5,
            }}
          >
            <WeekendOutlinedIcon /> [ {seatNumbers.join(", ")} ]
          </Typography>

          <Typography variant="caption">Booked at {bookingTime}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1.5,
          marginTop: 1,
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
