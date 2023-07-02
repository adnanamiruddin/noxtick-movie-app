import { createSlide } from "@reduxjs/toolkit";

export const authModalSlice = createSlide({
  name: "authModal",
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
