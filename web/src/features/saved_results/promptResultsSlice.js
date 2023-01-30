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
            console.log("removePromptResult", action.payload)
            state.items = state.items.filter(result => result.id !== action.payload.promptResultId);
            console.log(state.items);
        },
    },
    extraReducers: {
        [getPromptResults.fulfilled]: (state, action) => {
            console.log("getPromptResults.fulfilled");
            state.items = action.payload;
            state.isLoading = false;
        },
        [getPromptResults.pending]: (state, action) => {
            state.isLoading = true;
        }
    }
});

export const { pushPromptResult, removePromptResult } = promptResultsSlice.actions;