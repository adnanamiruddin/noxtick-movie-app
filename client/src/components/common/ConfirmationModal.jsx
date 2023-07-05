import React from "react";
import { useSelector } from "react-redux";
import { Modal, Box, Typography, Button } from "@mui/material";
import Logo from "./Logo";
import userTicketApi from "../../api/modules/user.ticket.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ConfirmationModal = ({
  open,
  handleClose,
  movie,
  selectedDate,
  selectedTime,
  selectedSeats,
}) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const total = selectedSeats.length * movie.ticket_price;

  const handleConfirmBuy = async () => {

    const body = {
      showtimeDate: selectedDate,
      showtimeTime: selectedTime,
      seatNumbers : selectedSeats,
      movieAgeRating: movie.age_rating,
      movieTicketPrice: total,
    };
    const { response, error } = await userTicketApi.bookTickets(body);
    const 

    if (response) {
      console.log({response});
      toast.success("Berhasil membeli tiket");
      setTimeout(() => {
        navigate("/")
      }, 1000);
    }
    if (error) toast.error(error.message);
  };

  return user ? (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "background.paper",
          boxShadow: 24,
          padding: 4,
          maxWidth: 600,
          borderRadius: "1rem",
          width: "75%",
        }}
      >
        <Logo />
        {user.age > movie.age_rating ? (
          <Box>
            <Typography variant="h6" mb={2}>
              Konfirmasi Pemesanan Tiket
            </Typography>

            <Typography variant="body1" mb={2}>
              Nama: {user.displayName}
            </Typography>

            <Typography variant="body1" mb={2}>
              Film: {movie.title}
            </Typography>

            <Typography variant="body1" mb={2}>
              Tanggal: {selectedDate}
            </Typography>

            <Typography variant="body1" mb={2}>
              Waktu: {selectedTime}
            </Typography>

            <Typography variant="body1" mb={2}>
              Kursi: {selectedSeats.join(", ")}
            </Typography>

            <Typography variant="body1" mb={2}>
              {`Total: Rp ${total}`}
            </Typography>

            <Button variant="contained" disabled={total !== 0 ? false : true} onClick={handleConfirmBuy}>Konfirmasi</Button>
          </Box>
        ) : (
          <Typography>UMUR LU BELUM CUKUP DEK</Typography>
        )}
      </Box>
    </Modal>
  ) : (
    ""
  );
};

export default ConfirmationModal;
