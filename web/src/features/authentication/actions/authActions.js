import { createAsyncThunk } from "@reduxjs/toolkit";
import { EmailAuthProvider, createUserWithEmailAndPassword, getAuth, reauthenticateWithCredential, sendEmailVerification, signInWithEmailAndPassword, updateEmail } from "firebase/auth";

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
            return thunkApi.rejectWithValue(e.code);
        }
    }
)

export const updateEmailWithReauth = async ({ password, email }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);

    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, email);

    return await sendEmailVerification(user);
}