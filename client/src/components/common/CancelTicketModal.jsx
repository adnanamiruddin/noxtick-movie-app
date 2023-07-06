import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import Logo from "./Logo";
import userTicketApi from "../../api/modules/user.ticket.api";
import { toast } from "react-toastify";
import { useState } from "react";

const CancelTicketModal = ({
  open,
  onClose,
  ticketId,
}) => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmCancel = async () => {
    const { response, error } = await userTicketApi.cancelTicket({
      ticketId,
      password,
    });

    if (response) toast.success("Ticket canceled successfully");
    if (error) toast.error(error.message);
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
          maxWidth: 400,
          borderRadius: "1rem",
          width: "75%",
          textAlign: "center",
        }}
      >
        <Logo />
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Konfirmasi Pembatalan Tiket
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          Apakah Anda yakin ingin membatalkan tiket ini?
        </Typography>

        <Typography variant="body1" mb={2}>
          Jumlah Penarikan: Rp {ticketId}
        </Typography>

        <TextField
          type="password"
          label="pasword..."
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <Button
          variant="contained"
          color="error"
          onClick={handleConfirmCancel}
          sx={{ marginRight: 2 }}
        >
          YA
        </Button>
        <Button variant="contained" onClick={onClose}>
          TIDAK
        </Button>
      </Box>
    </Modal>
  );
};

export default CancelTicketModal;
