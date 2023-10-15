import { configureStore } from "@reduxjs/toolkit";
// slice reducer
import { lmsAuthApi } from "./services/lmsAuthApi";
import { lmsCourseApi } from "./services/lmsCourseApi";
import { lmsPaymentApi } from "./services/lmsPaymentApi";
// services reducer
import authReducer from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
    [lmsAuthApi.reducerPath]: lmsAuthApi.reducer,
    [lmsCourseApi.reducerPath]: lmsCourseApi.reducer,
    [lmsPaymentApi.reducerPath]: lmsPaymentApi.reducer,
    auth: authReducer,
  },
  devTools: true,
  middleware: (gDM) =>
    gDM().concat([
      lmsAuthApi.middleware,
      lmsCourseApi.middleware,
      lmsPaymentApi.middleware,
    ]),
});

export default store;
