import { configureStore } from "@reduxjs/toolkit/dist";
import appStateSlice from "./features/appStateSlice";
import userSlice from "./features/userSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import authModalSlice from "./features/authModalSlice";
import themeModeSlice from "./features/themeModeSlice";

const store = configureStore({
  reducer: {
    appState: appStateSlice,
    user: userSlice,
    globalLoading: globalLoadingSlice,
    authModal: authModalSlice,
    themeMode: themeModeSlice,
  },
});

export default store;
