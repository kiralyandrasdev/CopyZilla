import { EmailAuthProvider, createUserWithEmailAndPassword, getAuth, reauthenticateWithCredential, sendEmailVerification, signInWithEmailAndPassword, updateEmail, deleteUser } from "firebase/auth";

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

export const updateEmailWithReauth = async ({ password, email }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);

    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, email);

    return await sendEmailVerification(user);
}

export const deleteAccountWithReauth = async ({ password }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);

    await reauthenticateWithCredential(user, credential);
    await deleteUser(user);
}