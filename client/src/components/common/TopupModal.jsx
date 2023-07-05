import { Box, Modal, Typography, Button } from "@mui/material";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import userBalanceApi from "../../api/modules/user.balance.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { increaseBalance } from "../../redux/features/userBalanceSlice";

const TopupModal = ({ open, onClose, selectedAmount }) => {
  const { user } = useSelector((state) => state.user);
  const {balance} = useSelector((state) => state.balance);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleTopup = async () => {
    if (selectedAmount) {
      const { response, error } = await userBalanceApi.topup({
        amount: selectedAmount,
      });

      if (response) {
        dispatch(increaseBalance(response.balanceAmount))
        toast.success("Berhasil top up saldo");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
      if (error) toast.error(error.message);
    }
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
          Saldo Awal: {balance}
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
