import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import WithdrawModal from "../components/common/WithdrawModal";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

const WithdrawBalance = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      dispatch(setGlobalLoading(true));
      await setBalance(user.balance);
      dispatch(setGlobalLoading(false));
    };

    getBalance();
  }, [user, dispatch]);

  const handleClose = () => setIsModalOpen(false);

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2 }}>
      <Toolbar />
      <Typography variant="h5" mb={2}>
        Withdraw Balance
      </Typography>

      <Typography variant="body1" mb={2}>
        {`Your current balance is Rp ${balance}`}
      </Typography>

      <TextField
        type="number"
        label="Amount"
        variant="outlined"
        fullWidth
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        inputProps={{ inputProps: { min: 0, max: 500000 } }}
        sx={{ marginBottom: 2 }}
      />

      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        Withdraw
      </Button>

      <WithdrawModal open={isModalOpen} onClose={handleClose} amount={amount} />
    </Box>
  );
};

export default WithdrawBalance;
