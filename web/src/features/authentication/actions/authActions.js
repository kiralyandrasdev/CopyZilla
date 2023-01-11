import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkApi) => {
        const auth = getAuth();
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            return thunkApi.fulfillWithValue({ accessToken: result.user.accessToken, firebaseUid: result.user.uid });
        } catch (e) {
            return thunkApi.rejectWithValue(e.code);
        }
    }
)

export const createUser = createAsyncThunk(
    'auth/createUser',
    async ({ email, password }, thunkApi) => {
        const auth = getAuth();
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            return thunkApi.fulfillWithValue({ accessToken: result.user.accessToken, firebaseUid: result.user.uid });
        } catch (e) {
            return thunkApi.rejectWithValue(e.code);
        }
    }
)

export const signOut = createAsyncThunk(
    'auth/signOut',
    async (thunkApi) => {
        const auth = getAuth();
        try {
            return await auth.signOut();
        } catch (e) {
            console.log("signed out error: ", e.code)
            return thunkApi.rejectWithValue(e.code);
        }
    }
)