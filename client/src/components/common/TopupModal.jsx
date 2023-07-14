import { Box, Modal, Typography, Button } from "@mui/material";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import userBalanceApi from "../../api/modules/user.balance.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import uiConfigs from "../../configs/ui.configs";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";

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
          Top Up Balance
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
              gap: {xs: 2, sm: 1},
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
              gap: {xs: 2, sm: 1},
              flexDirection: { xs: "row", sm: "row-reverse" },
              maxWidth: { xs: "100%", sm: "40%" },
              textAlign: { xs: "start", sm: "end" },
            }}
          >
            <PointOfSaleOutlinedIcon /> Selected Amount Rp.{selectedAmount}
          </Typography>
        </Box>

        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="caption">
            Confirm your purchase, {user.displayName.split(" ")[0]}
          </Typography>
          <Button
            variant="contained"
            onClick={handleTopup}
            sx={{ width: "50%" }}
          >
            Top Up
          </Button>
        </Box>

        {/* 

        <Button variant="contained" onClick={handleTopup}>
          Topup
        </Button> */}
      </Box>
    </Modal>
  );
};

export default TopupModal;
