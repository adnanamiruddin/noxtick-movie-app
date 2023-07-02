import { configureStore } from "@reduxjs/toolkit";
import globalLoadingReducer from "./features/globalLoadingSlice";
import authModalSlice from "./features/authModalSlice";

const store = configureStore({
  reducer: {
    globalLoading: globalLoadingReducer,
    authModal: authModalSlice,
  },
});

export default store;
