import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import { toast } from "react-toastify";
import userBalanceApi from "../../api/modules/user.balance.api";
import { useNavigate } from "react-router-dom";

const WithdrawModal = ({
  open,
  onClose,
  amount,
}) => {
  const {user} = useSelector(state => state.user)

  const navigate = useNavigate()

  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmWithdraw = async () => {
    if (amount <= 0) {
      toast.error("Withdraw amount must be greater than 0");
      return;
    }
    if (amount > 500000) {
      toast.error("Maximum withdraw amount is Rp.500.000");
      return;
    }
    const { response, error } = await userBalanceApi.withdraw({ amount, password });
    if (response) {
      toast.success("Withdraw successful");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    }
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
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxWidth: 400,
        }}
      >
        <Logo />

        <Typography variant="h6" mb={2}>
          Konfirmasi Penarikan Saldo
        </Typography>

        <Typography variant="body1" mb={2}>
          Nama: {user.displayName}
        </Typography>

        <Typography variant="body1" mb={2}>
          Saldo Anda: Rp {user.balance}
        </Typography>

        <Typography variant="body1" mb={2}>
          Jumlah Penarikan: Rp {amount}
        </Typography>

        <TextField
          type="password"
          label="pasword..."
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <Button variant="contained" onClick={handleConfirmWithdraw}>
          Konfirmasi Penarikan
        </Button>
      </Box>
    </Modal>
  );
};

export default WithdrawModal;
