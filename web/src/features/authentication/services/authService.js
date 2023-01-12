import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function handleLogin(email, password) {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            return cred.user;
        })
}

export async function handleSignup(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            return cred.user;
        })
}