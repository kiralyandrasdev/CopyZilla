import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const processQuickPrompt = createAsyncThunk(
    'editor/processQuickPrompt',
    async ({ firebaseUid, prompt }, thunkApi) => {
        try {
            const response = await axios.post(`https://localhost:7107/api/user/${firebaseUid}/quickPrompt`, prompt);
            return thunkApi.fulfillWithValue(response.data.value);
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const processAdvancedPrompt = createAsyncThunk(
    'editor/processAdvancedPrompt',
    async ({ firebaseUid, prompt }, thunkApi) => {
        try {
            const response = await axios.post(`https://localhost:7107/api/user/${firebaseUid}/advancedPrompt`, prompt);
            return thunkApi.fulfillWithValue(response.data.value);
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);