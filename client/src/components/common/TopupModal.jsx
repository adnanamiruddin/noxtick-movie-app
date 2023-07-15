import { Box, Modal, Typography, Button } from "@mui/material";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import userBalanceApi from "../../api/modules/user.balance.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import uiConfigs from "../../configs/ui.configs";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import userApi from "../../api/modules/user.api";

const TopupModal = ({ open, onClose, selectedAmount }) => {
  const { user, listTickets } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [onRequest, setOnRequest] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getUserInfo = async () => {
      dispatch(setGlobalLoading(true));
      const { response } = await userApi.getInfo();
      dispatch(setGlobalLoading(false));

      if (response) setBalance(response.balance);
    };

    getUserInfo();
  }, [user, listTickets, dispatch]);

  const handleTopup = async () => {
    if (onRequest) return;

    setOnRequest(true);
    if (selectedAmount) {
      const { response, error } = await userBalanceApi.topup({
        amount: selectedAmount,
      });

      if (response) {
        toast.success("Successfully top up the balance");
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
              gap: { xs: 2, sm: 1 },
              maxWidth: { xs: "100%", sm: "40%" },
            }}
          >
            <AttachMoneyOutlinedIcon /> Current Balance Rp.{balance}
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
      </Box>
    </Modal>
  );
};

export default TopupModal;
