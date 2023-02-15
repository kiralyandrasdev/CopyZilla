import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

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