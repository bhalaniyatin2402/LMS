import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || '',
    data: localStorage.getItem('data') || {}
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
})

export const {} = AuthSlice.actions
export default AuthSlice.reducer
