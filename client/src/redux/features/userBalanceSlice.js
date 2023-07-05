import { createSlice } from "@reduxjs/toolkit";

export const userBalanceSlice = createSlice({
  name: "UserBalance",
  initialState: {
    balance: 0,
  },
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    increaseBalance: (state, action) => {
      state.balance += action.payload;
    },
    decreaseBalance: (state, action) => {
      state.balance -= action.payload;
    }
  },
});

export const { setBalance, increaseBalance, decreaseBalance } = userBalanceSlice.actions;

export default userBalanceSlice.reducer;
