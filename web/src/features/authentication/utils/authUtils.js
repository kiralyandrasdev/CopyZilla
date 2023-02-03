export function firebaseSignupErrorMessage(error) {
    if (error == "auth/invalid-email") {
        return "Helytelen e-mail cím";
    }
    if (error == "auth/user-not-found") {
        return "Nem található felhasználó";
    }
    if (error == "auth/wrong-password") {
        return "Helytelen jelszó";
    }
    if (error == "auth/email-already-in-use") {
        return "Ez az e-mail cím már használatban van";
    }
    if (error == "auth/weak-password") {
        return "A jelszónak minimum 8 karaktert kell tartalmaznia"
    }
    if (error == "auth/network-request-failed") {
        return "Hálózati hiba";
    }
    return error;
}

export function firebaseLoginErrorMessage(error) {
    if (error == "auth/invalid-email") {
        return "Helytelen e-mail cím";
    }
    if (error == "auth/user-not-found") {
        return "Nem található felhasználó";
    }
    if (error == "auth/wrong-password") {
        return "Helytelen jelszó";
    }
    if (error == "auth/network-request-failed") {
        return "Hálózati hiba";
    }
    return error;
}