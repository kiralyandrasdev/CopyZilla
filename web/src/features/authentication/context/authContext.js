import React, { createContext, useEffect } from "react";
import usePersistState from "../../../hooks/usePersistState";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = usePersistState("firebaseUser", {});

    const updateFirebaseUser = (value) => {
        setFirebaseUser(value);
    }

    const accessToken = firebaseUser ? firebaseUser.accessToken : null;
    const firebaseUid = firebaseUser ? firebaseUser.firebaseUid : null;
    const isLoggedIn = accessToken && firebaseUid;

    const value = {
        isLoggedIn,
        firebaseUser,
        updateFirebaseUser,
        accessToken,
        firebaseUid,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}