import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const updateLoggedIn = (value) => {
        setIsLoggedIn(value);
    }

    const value = {
        isLoggedIn,
        updateLoggedIn,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}