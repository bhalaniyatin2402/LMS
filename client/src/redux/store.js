import { configureStore } from "@reduxjs/toolkit";
// services reducer
import { lmsAuthApi } from "./services/lmsAuthApi";
// slice reducer
import authReducer from "./slices/AuthSlice";
import chatReducer from "./slices/chatSlice";

const store = configureStore({
  reducer: {
    [lmsAuthApi.reducerPath]: lmsAuthApi.reducer,
    auth: authReducer,
    chat: chatReducer
  },
  devTools: import.meta.env.VITE_APP_NODE_ENV === "development" ? true : false,
  middleware: (gDM) => gDM().concat(lmsAuthApi.middleware),
});

export default store;
