import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import WithdrawModal from "../components/common/WithdrawModal";

const WithdrawBalance = () => {
  const { user } = useSelector((state) => state.user);

  const [amount, setAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => setIsModalOpen(false);

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2 }}>
      <Toolbar />
      <Typography variant="h5" mb={2}>
        Withdraw Balance
      </Typography>
      <Typography variant="body1" mb={2}>
        {`Your current balance is Rp ${user.balance}`}
      </Typography>
      <TextField
        type="number"
        label="Amount"
        variant="outlined"
        fullWidth
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        inputProps={{ inputProps: { min: 0, max: 500000 } }}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        Withdraw
      </Button>
      <WithdrawModal open={isModalOpen} onClose={handleClose} amount={amount} />
    </Box>
  );
};

export default WithdrawBalance;
