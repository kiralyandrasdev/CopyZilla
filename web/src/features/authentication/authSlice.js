import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        }
    }
});

export const { setAccessToken, setEmail } = authSlice.actions;