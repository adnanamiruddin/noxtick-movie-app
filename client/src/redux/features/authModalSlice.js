import { createSlice } from "@reduxjs/toolkit/dist";

export const authModalSlice = createSlice({
  name: "AuthModal",
  initialState: {
    authModal: false,
  },
  reducers: {
    setAuthModalOpen: (state, action) => {
      state.authModal = action.payload;
    },
  },
});

export const { setAuthModalOpen } = authModalSlice.actions;

export default authModalSlice.reducer;
