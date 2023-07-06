import { Box, Modal, Typography, Button } from "@mui/material";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import userBalanceApi from "../../api/modules/user.balance.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TopupModal = ({ open, onClose, selectedAmount }) => {
  const { user } = useSelector((state) => state.user);

  const [onRequest, setOnRequest] = useState(false);

  const navigate = useNavigate();

  const handleTopup = async () => {
    if (onRequest) return;

    setOnRequest(true);
    if (selectedAmount) {
      const { response, error } = await userBalanceApi.topup({
        amount: selectedAmount,
      });

      if (response) {
        toast.success("Berhasil top up saldo");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1500);
      }
      if (error) toast.error(error.message);
    }
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
          maxWidth: 600,
          borderRadius: "1rem",
          width: "75%",
        }}
      >
        <Logo />

        <Typography variant="h6" mb={2}>
          Topup Saldo
        </Typography>

        <Typography variant="body1" mb={2}>
          Nama Pengguna: {user.displayName}
        </Typography>

        <Typography variant="body1" mb={2}>
          Saldo Awal: Rp.{user.balance}
        </Typography>

        <Typography variant="body1" mb={2}>
          Total Topup Saldo: {selectedAmount}
        </Typography>

        <Button variant="contained" onClick={handleTopup}>
          Topup
        </Button>
      </Box>
    </Modal>
  );
};

export default TopupModal;
