import { EmailAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, reauthenticateWithCredential, updatePassword } from "firebase/auth";

export async function login({ email, password }) {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
}

export async function signup({ email, password }) {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
}

export async function logout() {
    const auth = getAuth();
    await auth.signOut();
}

export async function changePassword({ newPassword }) {
    const auth = getAuth();
    const user = auth.currentUser;
    await updatePassword(user, newPassword);
}

export const reauthenticateWithPassword = async ({ password }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);

    return await reauthenticateWithCredential(user, credential);
}

export const tryReauthenticationWithPassword = async ({ password }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);

    try {
        await reauthenticateWithCredential(user, credential);
    } catch (error) {
        return false;
    }
    return true;
}