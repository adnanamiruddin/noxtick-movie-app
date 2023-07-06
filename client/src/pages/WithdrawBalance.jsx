import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import userBalanceApi from "../api/modules/user.balance.api";
import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";

const WithdrawBalance = () => {
  const { balance } = useSelector((state) => state.balance);

  const [amount, setAmount] = useState("");

  const handleWithdraw = async () => {
    if (amount <= 0) {
      toast.error("Withdraw amount must be greater than 0");
      return;
    }
    if (amount > 500000) {
      toast.error("Maximum withdraw amount is 500,000");
      return;
    }
    const { response, error } = await userBalanceApi.withdraw({ amount });
    if (response) {
      toast.success("Withdraw successful");
    }
    if (error) {
      toast.error(error.message);
    }
  };

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
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleWithdraw}>
        Withdraw
      </Button>
    </Box>
  );
};

export default WithdrawBalance;
