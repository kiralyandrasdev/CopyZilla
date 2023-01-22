import { createSlice } from "@reduxjs/toolkit";
import { processAdvancedPrompt, processQuickPrompt } from "./actions/editorActions";

const initialState = {
    isLoading: false,
    error: null,
    result: null,
    editorMode: "quickMode",
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        clearResult: (state) => {
            state.result = null;
        },
        resetEditor: (state) => {
            state.result = null;
            state.error = null;
        },
        setEditorMode: (state, action) => {
            state.editorMode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            processQuickPrompt.fulfilled,
            (state, action) => {
                console.log("processQuickPrompt.fulfilled: ", action.payload)
                state.result = action.payload;
                state.isLoading = false;
            });
        builder.addCase(
            processQuickPrompt.pending,
            (state) => {
                console.log("processQuickPrompt.pending")
                state.isLoading = true;
            }
        );
        builder.addCase(
            processQuickPrompt.rejected,
            (state, action) => {
                console.log("processQuickPrompt.rejected: ", action.payload)
                state.error = action.payload;
                state.isLoading = false;
            }
        );
        builder.addCase(
            processAdvancedPrompt.fulfilled,
            (state, action) => {
                console.log("processAdvancedPrompt.fulfilled: ", action)
                state.result = action.payload;
                state.isLoading = false;
            }
        );
        builder.addCase(
            processAdvancedPrompt.pending,
            (state) => {
                console.log("processAdvancedPrompt.pending")
                state.isLoading = true;
            }
        );
        builder.addCase(
            processAdvancedPrompt.rejected,
            (state, action) => {
                console.log("processAdvancedPrompt.rejected: ", action.payload)
                state.isLoading = false;
                state.error = action.payload;
            }
        );
    }
});

export const { resetEditor, setEditorMode } = editorSlice.actions;