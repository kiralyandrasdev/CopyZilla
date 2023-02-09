import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../../config/envConfig";

export const getPromptResults = createAsyncThunk(
    'promptResults/getPromptResults',
    async ({ userId, link }, thunkApi) => {
        try {
            const url = link || `${apiBaseUrl}/user/${userId}/promptResults`;
            const response = await axios.get(url, prompt);
            return thunkApi.fulfillWithValue(response.data.value);
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const savePromptResult = createAsyncThunk(
    'promptResults/savePromptResult',
    async ({ userId, promptResult }, thunkApi) => {
        try {
            await axios.post(`${apiBaseUrl}/user/${userId}/promptResults`, promptResult);
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const deletePromptResult = createAsyncThunk(
    'promptResults/deletePromptResult',
    async ({ userId, promptResultId }, thunkApi) => {
        try {
            await axios.delete(`${apiBaseUrl}/user/${userId}/promptResults/${promptResultId}`);
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);