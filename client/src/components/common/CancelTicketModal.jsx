import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import Logo from "./Logo";
import userTicketApi from "../../api/modules/user.ticket.api";
import { toast } from "react-toastify";
import { useState } from "react";
import bookedSeatsApi from "../../api/modules/booked.seats.api";
import { useDispatch } from "react-redux";
import { cancelTicket } from "../../redux/features/userSlice";
import uiConfigs from "../../configs/ui.configs";
import DateRangeIcon from "@mui/icons-material/DateRange";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";

const CancelTicketModal = ({ open, onClose, ticket }) => {
  const { id, seatNumbers, showtimeDate, showtimeTime, movieTitle } = ticket;

  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [onRequest, setOnRequest] = useState(false);

  const currentTime = new Date();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmCancel = async () => {
    if (onRequest) return;

    setOnRequest(true);
    const { response, error } = await userTicketApi.cancelTicket({
      ticketId: id,
      password,
    });

    if (response) {
      const { response, error } = await bookedSeatsApi.deleteBookedSeats({
        seatNumbers,
        showtimeDate,
        showtimeTime,
        movieTitle,
      });

      if (response) {
        dispatch(cancelTicket(ticket));
        toast.success(response);
        onClose();
      }
      if (error) toast.error(error.message);
    }

    if (error) toast.error(error.message);
    setOnRequest(false);
  };

  return (
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
        <Typography
          variant="h5"
          fontWeight="800"
          sx={{
            marginTop: 1,
            marginBottom: 3,
            ...uiConfigs.style.typoLines(2, "center"),
          }}
        >
          Ticket Cancellation Confirmation
        </Typography>

        <Typography
          variant="h6"
          fontWeight="800"
          sx={{
            marginTop: 1,
            marginBottom: 3,
            ...uiConfigs.style.typoLines(3, "center"),
          }}
        >
          {movieTitle}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "start",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0.5, md: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              flexDirection: "column",
              gap: 2,
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
                gap: 1.5,
                flexDirection: { xs: "row", sm: "row-reverse" },
                textAlign: { xs: "start", sm: "end" },
              }}
            >
              <WeekendOutlinedIcon /> [ {seatNumbers.join(", ")} ]
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: { xs: 2.5, sm: 4 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{ ...uiConfigs.style.typoLines(2, "center") }}
          >
            Please input your password account to confirm the cancellation
          </Typography>
          <TextField
            type="password"
            label="pasword..."
            value={password}
            onChange={handlePasswordChange}
            autoSave="false"
            sx={{ marginBottom: { xs: 1, sm: 1.5 } }}
          />
          <Typography
            variant="caption"
            sx={{
              marginBottom: 0.5,
              ...uiConfigs.style.typoLines(2, "center"),
            }}
          >
            Are you sure you want to cancel this ticket?
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmCancel}
              sx={{ marginRight: 2 }}
            >
              YES
            </Button>
            <Button variant="contained" onClick={onClose}>
              NO
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CancelTicketModal;
