import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../../config/envConfig";

export const processQuickPrompt = createAsyncThunk(
    'editor/processQuickPrompt',
    async ({ accessToken, firebaseUid, prompt }, thunkApi) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/user/${firebaseUid}/quickPrompt`, prompt,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
            return thunkApi.fulfillWithValue(response.data.value);
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const processAdvancedPrompt = createAsyncThunk(
    'editor/processAdvancedPrompt',
    async ({ accessToken, firebaseUid, prompt }, thunkApi) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/user/${firebaseUid}/advancedPrompt`, prompt,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
            return thunkApi.fulfillWithValue(response.data.value);
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);