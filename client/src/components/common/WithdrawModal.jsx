import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import { toast } from "react-toastify";
import userBalanceApi from "../../api/modules/user.balance.api";
import { useNavigate } from "react-router-dom";
import uiConfigs from "../../configs/ui.configs";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";

const WithdrawModal = ({ open, onClose, selectedAmount }) => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [onRequest, setOnRequest] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmWithdrawal = async () => {
    if (onRequest) return;

    setOnRequest(true);
    if (selectedAmount <= 0) {
      toast.error("Withdraw amount must be greater than 0");
      return;
    }
    if (selectedAmount > 500000) {
      toast.error("Maximum withdraw amount is Rp.500.000");
      return;
    }
    const { response, error } = await userBalanceApi.withdraw({
      amount: selectedAmount,
      password,
    });
    if (response) {
      toast.success("Withdraw successful");
      setTimeout(() => {
        navigate("/");
      }, 1500);
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
          Withdraw Balance
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: { xs: "start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 4, sm: 0 },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: 2, sm: 1 },
              maxWidth: { xs: "100%", sm: "40%" },
            }}
          >
            <AttachMoneyOutlinedIcon /> Current Balance Rp.{user.balance}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: 2, sm: 1.5 },
              flexDirection: { xs: "row", sm: "row-reverse" },
              maxWidth: { xs: "100%", sm: "40%" },
              textAlign: { xs: "start", sm: "end" },
            }}
          >
            <PointOfSaleOutlinedIcon /> Withdrawal Amount Rp.{selectedAmount}
          </Typography>
        </Box>

        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="caption">
            Please input your password account, {user.displayName.split(" ")[0]}
          </Typography>
          <TextField
            type="password"
            label="pasword..."
            value={password}
            onChange={handlePasswordChange}
            autoSave="false"
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleConfirmWithdrawal}
            sx={{ width: "50%" }}
          >
            Withdraw
          </Button>
        </Box>
      </Box>

      {/* 

      {/* 

        <Button variant="contained" onClick={handleConfirmWithdrawal}>
          Konfirmasi Penarikan
        </Button>
      </Box> */}
    </Modal>
  );
};

export default WithdrawModal;
