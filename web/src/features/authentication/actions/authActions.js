import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";

export const loginFirebaseUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkApi) => {
        const auth = getAuth();
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            const payload = {
                accessToken: result.user.accessToken,
                firebaseUid: result.user.uid,
                emailVerified: result.user.emailVerified,
                email: result.user.email
            };
            return thunkApi.fulfillWithValue(payload);
        } catch (e) {
            return thunkApi.rejectWithValue(e.code);
        }
    }
)

export const createFirebaseUser = createAsyncThunk(
    'auth/createUser',
    async ({ email, password }, thunkApi) => {
        const auth = getAuth();
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            const payload = {
                accessToken: result.user.accessToken,
                firebaseUid: result.user.uid,
                emailVerified: result.user.emailVerified,
                email: result.user.email
            };
            console.log(payload);
            return thunkApi.fulfillWithValue(payload);
        } catch (e) {
            return thunkApi.rejectWithValue(e.code);
        }
    }
)

export const signOutFirebaseUser = createAsyncThunk(
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