import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPromptResults = createAsyncThunk(
    'promptResults/getPromptResults',
    async ({ userId, link }, thunkApi) => {
        try {
            const url = link || `https://localhost:7107/api/user/${userId}/promptResults`;
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
            await axios.post(`https://localhost:7107/api/user/${userId}/promptResults`, promptResult);
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const deletePromptResult = createAsyncThunk(
    'promptResults/deletePromptResult',
    async ({ userId, promptResultId }, thunkApi) => {
        try {
            await axios.delete(`https://localhost:7107/api/user/${userId}/promptResults/${promptResultId}`);
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);