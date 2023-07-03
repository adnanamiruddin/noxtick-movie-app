import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
  name: "AuthModal",
  initialState: {
    authModal: false,
  },
  reducers: {
    setAuthModal: (state, action) => {
      state.authModal = action.payload;
    },
  },
});

export const { setAuthModal } = authModalSlice.actions;

export default authModalSlice.reducer;
