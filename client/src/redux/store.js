import { configureStore } from "@reduxjs/toolkit";
// services reducer
import { lmsAuthApi } from "./services/lmsAuthApi";
// slice reducer
import authReducer from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
    [lmsAuthApi.reducerPath]: lmsAuthApi.reducer,
    auth: authReducer,
  },
  devTools: import.meta.env.VITE_APP_NODE_ENV === "development" ? true : false,
  middleware: (gDM) => gDM().concat(lmsAuthApi.middleware),
});

export default store;
