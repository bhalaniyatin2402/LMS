import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      return action.payload;
    },
    setLogout(state) {
      return {
        isLoggedIn: false,
        role: "",
      };
    },
  },
});

export const { setCredentials, setLogout } = AuthSlice.actions;
export default AuthSlice.reducer;
