import { createSlice } from "@reduxjs/toolkit";
import { createFirebaseUser, loginFirebaseUser, signOutFirebaseUser } from "./actions/authActions";

const getValue = (key) => {
    const value = localStorage.getItem(key);
    if (value) {
        return value;
    } else {
        return null;
    }
}

const saveValue = (key, value) => {
    localStorage.setItem(key, value);
}

const purgeKey = (key) => {
    localStorage.removeItem(key);
}

const initialState = {
    loading: false,
    firebaseUid: getValue("firebase_uid"),
    accessToken: getValue("access_token"),
    emailVerified: getValue("email_verified"),
    email: getValue("email"),
    error: null,
    success: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            state.accessToken = payload.accessToken;
            state.firebaseUid = payload.firebaseUid;
        },
        logOut: (state) => {
            state.accessToken = null;
            state.firebaseUid = null;
        },
        resetAuthError: (state) => {
            state.error = null;
        }
    },
    extraReducers: {
        [loginFirebaseUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [loginFirebaseUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [loginFirebaseUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.accessToken = payload.accessToken;
            state.firebaseUid = payload.firebaseUid;
            state.emailVerified = payload.emailVerified;
            state.email = payload.email;

            saveValue("access_token", payload.accessToken);
            saveValue("firebase_uid", payload.firebaseUid);
            saveValue("email_verified", payload.emailVerified);
            saveValue("email", payload.email);
        },
        [createFirebaseUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [createFirebaseUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [createFirebaseUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.accessToken = payload.accessToken;
            state.firebaseUid = payload.firebaseUid;
            state.emailVerified = payload.emailVerified;
            state.email = payload.email;

            saveValue("access_token", payload.accessToken);
            saveValue("firebase_uid", payload.firebaseUid);
            saveValue("email_verified", payload.emailVerified);
            saveValue("email", payload.email);
        },
        [signOutFirebaseUser.pending]: (state) => {
            state.loading = true;

        },
        [signOutFirebaseUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [signOutFirebaseUser.fulfilled]: (state) => {
            purgeKey("access_token");
            purgeKey("firebase_uid");
            purgeKey("email_verified");
            purgeKey("email");

            state.loading = false;
            state.error = null;
            state.accessToken = null;
            state.firebaseUid = null;
            state.emailVerified = null;
            state.email = null;
        }
    }
});

export const { setCredentials, logOut, resetAuthError } = authSlice.actions;