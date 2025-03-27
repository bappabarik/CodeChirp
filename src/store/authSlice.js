import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    installationStatus: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        changeInstallationStatus: (state, action) => {
            state.installationStatus = action.payload
        }
     }
})

export const {login, logout, changeInstallationStatus} = authSlice.actions;

export default authSlice.reducer;