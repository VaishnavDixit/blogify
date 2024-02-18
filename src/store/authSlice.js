// redux-toolkit store for auth
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            // state  = initialState accessible from here.
            console.log(state);
            console.log(action);
            state.status = true;
            state.userData = action.payload.userData;
            //data passed as login(data) can be accessed as follows -> action.payload
			
        },
        logout: (state, action) => {
            // status  = initial state.
            state.status = false;
            state.userData = null;
        },
        // these will be exported
    },
});
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;