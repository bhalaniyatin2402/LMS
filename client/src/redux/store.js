import { configureStore } from "@reduxjs/toolkit";
// slice reducer
import { lmsAuthApi } from "./services/lmsAuthApi";
// services reducer
import authReducer from "./slices/AuthSlice";

const store = configureStore({
    reducer: {
        [lmsAuthApi.reducerPath]: lmsAuthApi.reducer,
        auth: authReducer
    },
    devTools: true,
    middleware: (gDM) => gDM().concat(lmsAuthApi.middleware)
})

export default store
