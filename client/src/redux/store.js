import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import userSlice from "./features/userSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import authModalSlice from "./features/authModalSlice";

const store = configureStore({
  reducer: {
    appState: appStateSlice,
    user: userSlice,
    globalLoading: globalLoadingSlice,
    authModal: authModalSlice,
  },
});

export default store;
