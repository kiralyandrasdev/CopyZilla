import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk(
    "user/createUser",
    async (user, thunkApi) => {
        try {
            const result = await axios.post("https://localhost:7107/api/user", user);
            return thunkApi.fulfillWithValue(result.data.value);
        } catch (e) {
            return thunkApi.rejectWithValue(JSON.stringify(e));
        }
    }
)

export const getUser = createAsyncThunk(
    "user/getUser",
    async (firebaseUid, thunkApi) => {
        try {
            const result = await axios.get(`https://localhost:7107/api/user/${firebaseUid}`);
            return thunkApi.fulfillWithValue(result.data.value);
        } catch (e) {
            return thunkApi.rejectWithValue(JSON.stringify(e));
        }
    }
)

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (firebaseUid, thunkApi) => {
        try {
            await axios.delete(`https://localhost:7107/api/user/${firebaseUid}`);
        } catch (e) {
            return thunkApi.rejectWithValue(JSON.stringify(e));
        }
    }
)