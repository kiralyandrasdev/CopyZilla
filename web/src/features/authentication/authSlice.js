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
        }
    }
});

export const { setAccessToken } = authSlice.actions;