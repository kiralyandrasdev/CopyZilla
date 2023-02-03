import { createSlice } from "@reduxjs/toolkit";
import { createUser, getUser } from "./actions/userActions";

const initialState = {
    isLoading: false,
    error: null,
    user: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        decreaseCreditCount: (state) => {
            state.user.creditCount -= 1;
        },
        increaseCreditCount: (state) => {
            state.user.creditCount += 1;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            getUser.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            }
        );
        builder.addCase(
            getUser.pending,
            (state) => {
                state.isLoading = true;
            }
        );
        builder.addCase(
            getUser.rejected,
            (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }
        );
        builder.addCase(
            createUser.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            }
        );
        builder.addCase(
            createUser.pending,
            (state) => {
                state.isLoading = true;
            }
        );
        builder.addCase(
            createUser.rejected,
            (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }
        );
    }
});

export const { decreaseCreditCount, increaseCreditCount } = userSlice.actions;