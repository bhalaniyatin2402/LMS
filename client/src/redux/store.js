import { configureStore } from "@reduxjs/toolkit";
// slice reducer
import { lmsAuthApi } from "./services/lmsAuthApi";
import { lmsCourseApi } from "./services/lmsCourseApi";
// services reducer
import authReducer from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
    [lmsAuthApi.reducerPath]: lmsAuthApi.reducer,
    [lmsCourseApi.reducerPath]: lmsCourseApi.reducer,
    auth: authReducer,
  },
  devTools: true,
  middleware: (gDM) =>
    gDM().concat([lmsAuthApi.middleware, lmsCourseApi.middleware]),
});

export default store;
