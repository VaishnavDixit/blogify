// redux-toolkit store for auth
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            // status  = initial state.
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state, action) => {
            // status  = initial state.
            state.status = false;
            state.userData = null;
        },
		// these will be exported
    },
});


export const {login, logout} = authSlice.actions