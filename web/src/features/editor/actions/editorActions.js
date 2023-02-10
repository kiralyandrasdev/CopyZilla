import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../../config/envConfig";

export const processQuickPrompt = createAsyncThunk(
    'editor/processQuickPrompt',
    async ({ firebaseUid, prompt }, thunkApi) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/user/${firebaseUid}/quickPrompt`, prompt);
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
            const response = await axios.post(`${apiBaseUrl}/user/${firebaseUid}/advancedPrompt`, prompt);
            return thunkApi.fulfillWithValue(response.data.value);
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);