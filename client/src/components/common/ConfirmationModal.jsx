import { useDispatch, useSelector } from "react-redux";
import { Modal, Box, Typography, Button } from "@mui/material";
import Logo from "./Logo";
import userTicketApi from "../../api/modules/user.ticket.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import bookedSeatsApi from "../../api/modules/booked.seats.api";
import { bookTickets } from "../../redux/features/userSlice";

const ConfirmationModal = ({
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

  const total = selectedSeats.length * movie.ticket_price;

  const handleConfirmBuy = async () => {
    const body = {
      showtimeDate: selectedDate,
      showtimeTime: selectedTime,
      seatNumbers: selectedSeats,
      movieAgeRating: movie.age_rating,
      movieTicketPrice: total,
      movieTitle: movie.title,
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
        dispatch(bookTickets(selectedSeats));
        toast.success("Berhasil membeli tiket");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
      if (error) toast.error(error.message);
    }
    if (error) toast.error(error.message);
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

            <Button
              variant="contained"
              disabled={total !== 0 ? false : true}
              onClick={handleConfirmBuy}
            >
              Konfirmasi
            </Button>
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
