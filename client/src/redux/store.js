import { configureStore } from "@reduxjs/toolkit";
// slice reducer
import { lmsAuthApi } from "./services/lmsAuthApi";
import { lmsCourseApi } from "./services/lmsCourseApi";
import { lmsPaymentApi } from "./services/lmsPaymentApi";
import { lmsMyCourseApi } from "./services/lmsMyCourseApi";
import { lmsAdminApi } from "./services/lmsAdminApi";
// services reducer
import authReducer from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
    [lmsAuthApi.reducerPath]: lmsAuthApi.reducer,
    [lmsCourseApi.reducerPath]: lmsCourseApi.reducer,
    [lmsPaymentApi.reducerPath]: lmsPaymentApi.reducer,
    [lmsMyCourseApi.reducerPath]: lmsMyCourseApi.reducer,
    [lmsAdminApi.reducerPath]: lmsAdminApi.reducer,
    auth: authReducer,
  },
  devTools: true,
  middleware: (gDM) =>
    gDM().concat([
      lmsAuthApi.middleware,
      lmsCourseApi.middleware,
      lmsPaymentApi.middleware,
      lmsMyCourseApi.middleware,
      lmsAdminApi.middleware,
    ]),
});

export default store;
