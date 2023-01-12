import { createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, signOut } from "./actions/authActions";

const localAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        return accessToken;
    } else {
        return null;
    }
}

const saveAccessToken = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
}

const removeAccessToken = () => {
    localStorage.removeItem("accessToken");
}

const initialState = {
    loading: false,
    firebaseUid: null,
    accessToken: localAccessToken(),
    error: null,
    success: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.value = action.payload;
        },
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.accessToken = payload.accessToken;
            state.firebaseUid = payload.firebaseUid;
            saveAccessToken(payload.accessToken);
        },
        [createUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [createUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [createUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.accessToken = payload.accessToken;
            state.firebaseUid = payload.firebaseUid;
            saveAccessToken(payload.accessToken);
        },
        [signOut.pending]: (state) => {
            console.log("Signing out");
            state.loading = true;
        },
        [signOut.rejected]: (state, { payload }) => {
            console.log("Signing out rejected: ", payload);
            state.loading = false;
            state.error = payload;
        },
        [signOut.fulfilled]: (state) => {
            removeAccessToken();
            state.loading = false;
            state.error = null;
            state.accessToken = null;
            state.firebaseUid = null;
            console.log("signed out, new state: ", state)
        }
    }
});

export const { saveUser } = authSlice.actions;

export default authSlice.reducer;