import { createSlice } from "@reduxjs/toolkit";
import { deletePromptResult, getPromptResults, savePromptResult } from "./actions/savedResultsActions";

export const promptResultsSlice = createSlice({
    name: "savedResults",
    initialState: {
        isLoading: true,
        items: [],
    },
    reducers: {
        pushPromptResult: (state, action) => {
            state.items.unshift(action.payload.promptResult);
        },
        removePromptResult: (state, action) => {
            state.items = state.items.filter(result => result.id !== action.payload.promptResultId);
        },
    },
    extraReducers: {
        [getPromptResults.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getPromptResults.pending]: (state, action) => {
            state.isLoading = true;
        }
    }
});

export const { pushPromptResult, removePromptResult } = promptResultsSlice.actions;